import Button from '../Button';
import Style from './Header.module.scss';
import logo from '../../assets/image/logo.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { auth, fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { CartQuantity } from '../../layouts/DefaultLayout';
function Header() {
    console.log('re render Header');
    const cartData = useContext(CartQuantity);
    const [cartQty, setCartQty] = useState(0);
    const btnRef = useRef();
    const cx = classNames.bind(Style);
    const navigate = useNavigate();
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

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log('running useEffect');
                const getData = await getDocs(collection(fs, `cart-${user.uid}`));
                setCartQty(getData.docs.length);
            } else {
            }
        });
    }, [cartData.cartChange]);
    const user = GetCurentUser();

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
                        <input placeholder="Search trending ..." />
                        <div className={cx('searchBtn')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    {user ? (
                        <div>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <Tippy content="Your cart" placement="bottom">
                                    <Button className={cx('btn')} to="/cart" ref={btnRef}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <p>{cartQty}</p>
                                    </Button>
                                </Tippy>
                                <Tippy content={user} placement="bottom" ref={btnRef}>
                                    <Button className={cx('btn')}>
                                        <i className="fa-regular fa-user" ref={btnRef}></i>
                                    </Button>
                                </Tippy>
                                <Tippy content="Log out" placement="bottom">
                                    <Button className={cx('btn')} onClick={SignOut}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </Button>
                                </Tippy>
                            </div>
                        </div>
                    ) : (
                        <div className="action">
                            <Button className="btn btn-link" to="/login">
                                Sign in
                            </Button>
                            <Button className="btn btn-outline-primary" to="/register">
                                Sign up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
