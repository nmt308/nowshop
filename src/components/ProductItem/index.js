import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { auth, fs } from '../../Config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CartQuantity } from '../../layouts/DefaultLayout';
import { DetailProduct } from '../../layouts/DefaultLayout';
import Button from '../Button';
import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
export default function ProductItem({ data }) {
    const cx = classNames.bind(Style);
    const cartData = useContext(CartQuantity);
    const productDetail = useContext(DetailProduct);
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
    let product = data;

    const addToCart = async () => {
        product['qty'] = 1;
        product['TotalPrice'] = product.qty * data.priece;
        await setDoc(doc(fs, `cart-${uid}`, product.ID), {
            product,
        });
    };
    return (
        <div className={cx('product-item')}>
            <Button
                to={`/${data.name}-detail`}
                onClick={() => {
                    productDetail.setDetail(data);
                }}
            >
                <div className={cx('product-img')}>
                    <img src={data.url} alt="Product" />
                </div>
                <div className={cx('product-name')}>{data.name}</div>
                <div className={cx('product-price')}>{data.priece} VND</div>
            </Button>
            <Button
                className={cx('product-btn')}
                onClick={(e) => {
                    addToCart();
                    cartData.setCartChange(!cartData.cartChange);
                }}
            >
                Buy now
            </Button>
        </div>
    );
}
