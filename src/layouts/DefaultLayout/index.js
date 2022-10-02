import classNames from 'classnames/bind';
import Style from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createContext, useState } from 'react';
export const CartQuantity = createContext();
export const DetailProduct = createContext();
export const SearchContext = createContext();
const cx = classNames.bind(Style);
function DefaultLayout({ children }) {
    const [cartChange, setCartChange] = useState(true);
    const [detail, setDetail] = useState('');
    const [searchContext, setSearchContext] = useState('');
    return (
        <div className={cx('wrapper')}>
            <CartQuantity.Provider value={{ cartChange, setCartChange }}>
                <SearchContext.Provider value={{ searchContext, setSearchContext }}>
                    <Header />
                    <DetailProduct.Provider value={{ detail, setDetail }}>{children}</DetailProduct.Provider>
                </SearchContext.Provider>
            </CartQuantity.Provider>{' '}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
