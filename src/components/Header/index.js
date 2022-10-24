// local
import Button from '../Button';
import Style from './Header.module.scss';
import logoWeb from '../../assets/image/logo.png';
import logoMobile from '../../assets/icon/logoIcon.png';
import MenuItem from '../MenuItem';
import Search from '../Search';
import { useViewport } from '../../CustomHook';
import { CartQuantity } from '../../layouts/DefaultLayout';
// React
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Firebase
import { auth, fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
// Other
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import lottie from 'lottie-web';

const cx = classNames.bind(Style);
function Header() {
    const userIcon1 = useRef();
    const userIcon2 = useRef();
    const cartIcon1 = useRef();
    const cartIcon2 = useRef();
    const logoutIcon1 = useRef();
    const logoutIcon2 = useRef();
    const orderIcon1 = useRef();
    const orderIcon2 = useRef();
    const btnRef = useRef();
    const menuRef = useRef();

    const cartData = useContext(CartQuantity);
    const [cartQty, setCartQty] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    const SignOut = () => {
        localStorage.removeItem('user');
        setTimeout(() => {
            auth.signOut().then(() => {
                navigate('/');
            });
        }, 500);
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const querySnapshot = await getDocs(collection(fs, 'users'));
                querySnapshot.forEach((doc) => {
                    localStorage.setItem('user', doc.data().email);
                });
            } else {
            }
        });
    }, []);

    const user = localStorage.getItem('user');

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
        lottie.loadAnimation({
            name: 'order1',
            container: orderIcon1.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: require('../../assets/icon/order.json'),
        });
        lottie.loadAnimation({
            name: 'order2',
            container: orderIcon2.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/icon/order.json'),
        });
        return () => {
            lottie.destroy();
        };
    }, [user]);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 739;
    const isTablet = viewPort.width > 739 && viewPort.width <= 992;
    const isPc = viewPort.width > 992;

    useEffect(() => {
        if (!user) {
            return;
        }
        //Check mobile hoặc tablet mới set height cho menu
        if (isMobile || isTablet) {
            if (openMenu) {
                menuRef.current.style.height = menuRef.current.scrollHeight + 4 + 'px';
            } else {
                menuRef.current.style.height = 0;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu]);
    return (
        <nav className={cx('navbar navbar-expand-lg navbar-light bg-light', 'navbar')}>
            <div className="container">
                <div className="navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                    <div className={cx({ mobile: isMobile, tablet: isTablet, pc: isPc })}>
                        {isMobile || isTablet ? (
                            <img
                                src={logoMobile}
                                alt="logoMobile"
                                className={cx('logo')}
                                onClick={() => {
                                    navigate('/');
                                    setOpenMenu(false);
                                }}
                            />
                        ) : (
                            <img
                                src={logoWeb}
                                alt="logoWeb"
                                className={cx('logo')}
                                onClick={() => {
                                    navigate('/');
                                }}
                            />
                        )}
                        <Search />
                        {(isMobile && user) || (isTablet && user) ? (
                            <Button
                                className={cx('btn', 'custom-btn')}
                                onClick={() => {
                                    setOpenMenu(!openMenu);
                                }}
                            >
                                <i className="fa-solid fa-bars"></i>
                            </Button>
                        ) : (
                            <HeadlessTippy
                                interactive
                                delay={[0, 700]}
                                placement="bottom-end"
                                hideOnClick="false"
                                render={(attrs) => (
                                    <div className={cx('menu')}>
                                        <Link to="/login">Đăng nhập</Link>
                                        <Link to="/register">Đăng kí</Link>
                                    </div>
                                )}
                            >
                                <div className={cx('signin')}>
                                    <Button className={cx('btn', 'custom-btn')}>
                                        <div ref={userIcon1} className={cx('userIcon1')} />
                                        <div ref={userIcon2} className={cx('userIcon2')} />
                                    </Button>
                                </div>
                            </HeadlessTippy>
                        )}
                    </div>

                    {user ? (
                        <div
                            onClick={() => {
                                setOpenMenu(false);
                            }}
                            ref={menuRef}
                            className={cx('action', {
                                logged: user,
                                active: openMenu,
                            })}
                        >
                            <MenuItem content={user} placement="bottom" isPc>
                                <div className={cx('action-item')}>
                                    <Button className={cx('btn', 'custom-btn')}>
                                        <div ref={userIcon1} className={cx('userIcon1')} />
                                        <div ref={userIcon2} className={cx('userIcon2')} />
                                    </Button>
                                    <span>{user}</span>
                                </div>
                            </MenuItem>
                            <MenuItem content="Đơn hàng" placement="bottom" isPc>
                                <div
                                    className={cx('action-item')}
                                    onClick={() => {
                                        navigate('/order');
                                    }}
                                >
                                    <Button className={cx('btn', 'custom-btn')} ref={btnRef}>
                                        <div ref={orderIcon1} className={cx('orderIcon1')} />
                                        <div ref={orderIcon2} className={cx('orderIcon2')} />
                                    </Button>
                                    <span>Đơn hàng</span>
                                </div>
                            </MenuItem>
                            <MenuItem content="Giỏ hàng" placement="bottom" isPc>
                                <div
                                    className={cx('action-item')}
                                    onClick={() => {
                                        navigate('/cart');
                                    }}
                                >
                                    <Button className={cx('btn', 'custom-btn')} ref={btnRef}>
                                        <div ref={cartIcon1} className={cx('cartIcon1')} />
                                        <div ref={cartIcon2} className={cx('cartIcon2')} />
                                        <span className={cx('quantity')}>{cartQty}</span>
                                    </Button>
                                    <span>Giỏ hàng</span>
                                </div>
                            </MenuItem>

                            <MenuItem content="Đăng xuất" placement="bottom" isPc>
                                <div className={cx('action-item')} onClick={SignOut}>
                                    <Button className={cx('btn', 'custom-btn')}>
                                        <div ref={logoutIcon1} className={cx('logoutIcon1')} />
                                        <div ref={logoutIcon2} className={cx('logoutIcon2')} />
                                    </Button>
                                    <span>Đăng xuất</span>
                                </div>
                            </MenuItem>
                        </div>
                    ) : (
                        <div className={cx('authentication')}>
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
