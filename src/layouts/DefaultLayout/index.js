import classNames from 'classnames/bind';
import Style from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createContext, useState } from 'react';
export const CartQuantity = createContext();
export const DetailProduct = createContext();
const cx = classNames.bind(Style);
function DefaultLayout({ children }) {
    const [cartChange, setCartChange] = useState(true);
    const [detail, setDetail] = useState('');
    return (
        <div className={cx('wrapper')}>
            <CartQuantity.Provider value={{ cartChange, setCartChange }}>
                <Header />
                <DetailProduct.Provider value={{ detail, setDetail }}>{children}</DetailProduct.Provider>
            </CartQuantity.Provider>{' '}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
