import classNames from 'classnames/bind';
import Style from './DefaultLayout.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createContext, useState } from 'react';
import { auth, fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
export const CartQuantity = createContext();
export const DetailProduct = createContext();
export const SearchContext = createContext();
const cx = classNames.bind(Style);
function DefaultLayout({ children }) {
    const [cartChange, setCartChange] = useState(true);
    const [detail, setDetail] = useState('');
    const [searchContext, setSearchContext] = useState('');

    // useEffect(() => {
    //     auth.onAuthStateChanged(async (account) => {
    //         let user;
    //         if (account) {
    //             const querySnapshot = await getDocs(collection(fs, 'users'));
    //             querySnapshot.forEach((doc) => {
    //                 user = doc.data().email;
    //             });
    //         } else {
    //             user = null;
    //         }
    //     });
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <CartQuantity.Provider value={{ cartChange, setCartChange }}>
                <SearchContext.Provider value={{ searchContext, setSearchContext }}>
                    <DetailProduct.Provider value={{ detail, setDetail }}>
                        <Header />
                        {children}
                    </DetailProduct.Provider>
                </SearchContext.Provider>
            </CartQuantity.Provider>{' '}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
