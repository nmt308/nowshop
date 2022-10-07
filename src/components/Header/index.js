// local
import Button from '../Button';
import Style from './Header.module.scss';
import logo from '../../assets/image/logo.png';
import { SearchContext } from '../../layouts/DefaultLayout';
import { CartQuantity } from '../../layouts/DefaultLayout';
// React
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase
import { auth, fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
// Other
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import lottie from 'lottie-web';
const cx = classNames.bind(Style);
function Header() {
    const userIcon1 = useRef();
    const userIcon2 = useRef();
    const cartIcon1 = useRef();
    const cartIcon2 = useRef();
    const logoutIcon1 = useRef();
    const logoutIcon2 = useRef();
    const btnRef = useRef();

    const cartData = useContext(CartQuantity);
    const [cartQty, setCartQty] = useState(0);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const search = useContext(SearchContext);

    const SignOut = () => {
        setTimeout(() => {
            auth.signOut().then(() => {
                navigate('/');
            });
        }, 500);
    };
    const GetCurentUser = () => {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const querySnapshot = await getDocs(collection(fs, 'users'));
                    querySnapshot.forEach((doc) => {
                        setUser(doc.data().email);
                    });
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    };
    const user = GetCurentUser();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const getData = await getDocs(collection(fs, `cart-${user.uid}`));
                setCartQty(getData.docs.length);
            } else {
            }
        });
    }, [cartData.cartChange]);
    useEffect(() => {
        lottie.loadAnimation({
            name: 'user1',
            container: userIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../assets/icon/account.json'),
        });
        lottie.loadAnimation({
            name: 'user2',
            container: userIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/icon/account.json'),
        });
        lottie.loadAnimation({
            name: 'cart1',
            container: cartIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../assets/icon/cart.json'),
        });
        lottie.loadAnimation({
            name: 'cart2',
            container: cartIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/icon/cart.json'),
        });
        lottie.loadAnimation({
            name: 'logout1',
            container: logoutIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../assets/icon/logout.json'),
        });
        lottie.loadAnimation({
            name: 'logout2',
            container: logoutIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/icon/logout.json'),
        });
        return () => {
            lottie.destroy();
        };
    }, [user]);

    const handleValue = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setValue(value);
    };
    const handleSearch = () => {
        if (!value) {
            return;
        } else {
            setValue('');
            navigate('/search');
            search.setSearchContext(value);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <div className=" navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                    <img
                        src={logo}
                        alt="logo"
                        className={cx('logo')}
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm sản phẩm ..." value={value} onChange={handleValue} />
                        <div className={cx('searchBtn')} onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>

                    {user ? (
                        <div>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start action">
                                <Tippy content="Giỏ hàng" placement="bottom">
                                    <Button className={cx('btn', 'custom-btn')} to="/cart" ref={btnRef}>
                                        <div ref={cartIcon1} className={cx('cartIcon1')} />
                                        <div ref={cartIcon2} className={cx('cartIcon2')} />
                                        <span className={cx('quantity')}>{cartQty}</span>
                                    </Button>
                                </Tippy>
                                <Tippy content={user} placement="bottom" ref={btnRef}>
                                    <Button className={cx('btn')}>
                                        <div ref={userIcon1} className={cx('userIcon1')} />
                                        <div ref={userIcon2} className={cx('userIcon2')} />
                                    </Button>
                                </Tippy>
                                <Tippy content="Đăng xuất" placement="bottom">
                                    <Button className={cx('btn')} onClick={SignOut}>
                                        <div ref={logoutIcon1} className={cx('logoutIcon1')} />
                                        <div ref={logoutIcon2} className={cx('logoutIcon2')} />
                                    </Button>
                                </Tippy>
                            </div>
                        </div>
                    ) : (
                        <div className="action">
                            <Button className={cx('btn btn-link', 'btn-login')} to="/login">
                                Đăng nhập
                            </Button>
                            <Button className={cx('btn btn-outline-primary', 'btn-register')} to="/register">
                                Đăng kí
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
