import { fs, auth } from '../../Config/Config';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';
import CartItem from '../../components/CartItem';
import { CartQuantity } from '../../layouts/DefaultLayout';
import Button from '../../components/Button';
import payment from '../../assets/image/payments.png';
import Style from './Cart.scss';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
function Cart() {
    const cx = classNames.bind(Style);
    const [carts, setCarts] = useState([]);
    const [qtyChange, setQtyChange] = useState(true);
    const cartData = useContext(CartQuantity);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const getData = await getDocs(collection(fs, `cart-${user.uid}`));
                getData.forEach((snap) => {
                    //ID: #7 8:25
                    const cartDetail = snap.data();
                    setCarts((prev) => [...prev, cartDetail.product]);
                });
            } else {
            }
        });
    }, []);

    const deleteProduct = async (id) => {
        cartData.setCartChange(!cartData.cartChange);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await deleteDoc(doc(fs, `cart-${user.uid}`, `${id}`));
                setCarts(() => {
                    return carts.filter((cart) => cart.ID !== id);
                });
            } else {
                console.log('Error deleting');
            }
        });
    };

    let product;
    const increaseQty = async (cart, id) => {
        product = cart;
        product.qty = product.qty + 1;
        product.TotalPrice = product.priece * product.qty;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await updateDoc(doc(fs, `cart-${user.uid}`, `${id}`), {
                    product,
                });
            } else {
                console.log('Error increaseQty');
            }
        });
        setQtyChange(!qtyChange);
    };

    const decreaseQty = async (cart, id) => {
        product = cart;
        product.qty = product.qty - 1;
        product.TotalPrice = product.priece * product.qty;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await updateDoc(doc(fs, `cart-${user.uid}`, `${id}`), {
                    product,
                });
            } else {
                console.log('Error decreaseQty');
            }
        });
        setQtyChange(!qtyChange);
    };

    const TotalProduct = carts.reduce((total, cart) => {
        return total + cart.qty;
    }, 0);
    const TotalPrice = carts.reduce((total, cart) => {
        return total + cart.TotalPrice;
    }, 0);
    return (
        <div className="container">
            <section className={cx('section-content padding-y')}>
                <div className={cx('container mt-4')}>
                    <div className={cx('row')}>
                        <main className={cx('col-md-9')}>
                            <div className={cx('card')}>
                                <table className={cx('table table-borderless table-shopping-cart')}>
                                    <thead className={cx('text-muted')}>
                                        <tr className={cx('small text-uppercase')}>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col" width="120">
                                                Số lượng
                                            </th>
                                            <th scope="col" width="200">
                                                Giá
                                            </th>
                                            <th scope="col" width="120">
                                                {' '}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.map((cart, index) => {
                                            return (
                                                <CartItem
                                                    data={cart}
                                                    key={index}
                                                    deleteProduct={() => {
                                                        deleteProduct(cart.ID);
                                                    }}
                                                    increaseQty={() => {
                                                        increaseQty(cart, cart.ID);
                                                    }}
                                                    decreaseQty={() => {
                                                        decreaseQty(cart, cart.ID);
                                                    }}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className={cx('card-body border-top')}>
                                    <Button to="/" className={cx('btn btn-light', 'back-btn')}>
                                        {' '}
                                        <i className={cx('fa fa-chevron-left')}></i> Quay lại{' '}
                                    </Button>
                                    <Button to="/" className={cx('btn btn-primary float-md-right', 'apply-btn')}>
                                        {' '}
                                        Thanh toán <i className={cx('fa fa-chevron-right')}></i>{' '}
                                    </Button>
                                </div>
                            </div>

                            <div className={cx('alert alert-success mt-3')}>
                                <span className={cx('icontext')}>
                                    <i className={cx('icon text-success fa fa-truck')}></i> Giao nhanh miễn phí trong
                                    vòng 2-4 ngày
                                </span>
                            </div>
                        </main>
                        <aside className={cx('col-md-3')}>
                            <div className={cx('card mb-3')}>
                                <div className={cx('body')}>
                                    <form>
                                        <div className={cx('form-group')}>
                                            <label>Áp dụng voucher</label>
                                            <div className={cx('input-group mt-2 mb-2')}>
                                                <input
                                                    type="text"
                                                    className={cx('form-control')}
                                                    name=""
                                                    placeholder="Nhập mã"
                                                />

                                                <Button className={cx('btn btn-primary', 'apply-btn')}>Áp dụng</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={cx('card')}>
                                <div className={cx('body')}>
                                    <div className={cx('dlist-align')}>
                                        <p>Tổng giá:</p>
                                        <div className={cx('text-right')}>
                                            <NumericFormat
                                                value={TotalPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VNĐ'}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('dlist-align')}>
                                        <p>Tổng sản phẩm:</p>
                                        <div className={cx('text-right')}>{TotalProduct}</div>
                                    </div>
                                    <div className={cx('dlist-align')}>
                                        <p>Thành tiền:</p>
                                        <dd className={cx('text-right h6')}>
                                            <div>
                                                <NumericFormat
                                                    value={TotalPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VNĐ'}
                                                />
                                            </div>
                                        </dd>
                                    </div>
                                    <hr></hr>
                                    <p className={cx('text-center')}>
                                        <img src={payment} height="32" alt="payment" />
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;
