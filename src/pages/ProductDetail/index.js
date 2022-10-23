//Local
import Style from './ProductDetail.module.scss';
import Button from '../../components/Button';
import { CartQuantity } from '../../layouts/DefaultLayout';
//Firebase
import { setDoc, doc } from 'firebase/firestore';
import { fs, auth } from '../../Config/Config';
//React
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Toastify
import { notify } from '../../components/Toast';
import { ToastContainer } from 'react-toastify';
//Other
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';

const cx = classNames.bind(Style);
function ProductDetail() {
    const navigate = useNavigate();
    const product = JSON.parse(localStorage.getItem('productDetail'));
    const cartData = useContext(CartQuantity);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const increaseQty = () => {
        setQty((qty) => qty + 1);
    };

    const decreaseQty = () => {
        if (qty < 2) {
            notify('error', 'Số lượng tối thiểu là 1 !');
            return;
        }
        setQty((qty) => qty - 1);
    };

    const GetCurentUID = () => {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setUser(user.uid);
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    };

    const uid = GetCurentUID();

    const addToCart = async () => {
        if (!localStorage.getItem('user')) {
            alert('Vui lòng đăng nhập');
            navigate('/login');
            return;
        }
        product['qty'] = qty;
        product['TotalPrice'] = qty * product.price;
        await setDoc(doc(fs, `cart-${uid}`, product.ID), {
            product,
        });
        cartData.setCartChange(!cartData.cartChange);
        notify('success', 'Thêm thành công');
    };
    return (
        <div className={cx('section-content')}>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-6">
                        <div className={cx('image')}>
                            {' '}
                            <img src={product.url} alt="ProductImage" />
                        </div>
                    </aside>
                    <main className="col-md-6">
                        <article className="product-info-aside">
                            <h2 className={cx('title', 'mt-3')}>{product.name}</h2>
                            <div className="mb-3">
                                <h4>
                                    <NumericFormat
                                        value={product.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VNĐ'}
                                    />
                                </h4>
                                <span className="text-decoration-line-through">
                                    <NumericFormat
                                        value={product.oldprice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VNĐ'}
                                    />
                                </span>
                            </div>

                            <p>{product.description}</p>

                            <dl className="row">
                                <dt className="col-sm-3">Hãng sản xuất</dt>
                                <dd className="col-sm-9">{product.brand.toUpperCase()}</dd>

                                <dt className="col-sm-3">Bảo hành</dt>
                                <dd className="col-sm-9">2 năm</dd>

                                <dt className="col-sm-3">Giao hàng</dt>
                                <dd className="col-sm-9">2-4 ngày</dd>

                                <dt className="col-sm-3">Tình trạng</dt>
                                <dd className="col-sm-9">Còn hàng</dd>
                            </dl>

                            <div className="d-flex mt-4">
                                <div className={cx('product-text', 'quantity-box')}>
                                    <div className={cx('action-btns', 'minus')} onClick={decreaseQty}>
                                        <button>-</button>
                                    </div>
                                    <div className={cx('qty')}>{qty}</div>
                                    <div className={cx('action-btns', 'plus')} onClick={increaseQty}>
                                        <button>+</button>
                                    </div>
                                </div>

                                <Button className={cx('btn btn-primary', 'custom-btn')} onClick={addToCart}>
                                    <i className="fas fa-shopping-cart"></i> <span className="text">Thêm giỏ hàng</span>
                                </Button>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductDetail;
