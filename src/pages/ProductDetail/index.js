import { useContext, useEffect } from 'react';
import { DetailProduct } from '../../layouts/DefaultLayout';
import { CartQuantity } from '../../layouts/DefaultLayout';
import classNames from 'classnames/bind';
import Style from './ProductDetail.module.scss';
import Button from '../../components/Button';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { fs, auth } from '../../Config/Config';
import { notify } from '../../components/Toast';
import { ToastContainer } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
const cx = classNames.bind(Style);
function ProductDetail() {
    const detailProduct = useContext(DetailProduct);
    let product = detailProduct.detail;

    const cartData = useContext(CartQuantity);
    const [qty, setQty] = useState(1);
    const increaseQty = () => {
        setQty((qty) => qty + 1);
    };
    const decreaseQty = () => {
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
        detailProduct.detail['qty'] = qty;
        detailProduct.detail['TotalPrice'] = qty * detailProduct.detail.priece;
        await setDoc(doc(fs, `cart-${uid}`, detailProduct.detail.ID), {
            product,
        });
        cartData.setCartChange(!cartData.cartChange);

        notify('success', 'Thêm thành công');
    };
    return (
        <>
            <div class="section-content bg-white padding-y page-content">
                <div class="container mt-4">
                    <div class="row">
                        <aside class="col-md-6">
                            <div className={cx('image')}>
                                {' '}
                                <img src={detailProduct.detail.url} alt="ProductImage" />
                            </div>
                        </aside>
                        <main class="col-md-6">
                            <article class="product-info-aside">
                                <h2 className={cx('title', 'mt-3')}>{detailProduct.detail.name}</h2>

                                <div class="mb-3">
                                    <h4 class="">
                                        <NumericFormat
                                            value={detailProduct.detail.priece}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                    </h4>
                                    <span class="text-decoration-line-through">
                                        <NumericFormat
                                            value={detailProduct.detail.oldprice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                    </span>
                                </div>

                                <p>{detailProduct.detail.description}</p>

                                <dl class="row">
                                    <dt class="col-sm-3">Hãng sản xuất</dt>
                                    <dd class="col-sm-9">Apple</dd>

                                    <dt class="col-sm-3">Bảo hành</dt>
                                    <dd class="col-sm-9">2 năm</dd>

                                    <dt class="col-sm-3">Giao hàng</dt>
                                    <dd class="col-sm-9">2-4 ngày</dd>

                                    <dt class="col-sm-3">Tình trạng</dt>
                                    <dd class="col-sm-9">Còn hàng</dd>
                                </dl>

                                <div class="d-flex mt-4">
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
                                        <i class="fas fa-shopping-cart"></i> <span class="text">Thêm giỏ hàng</span>
                                    </Button>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ProductDetail;
