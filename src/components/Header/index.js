import Button from '../Button';
import Style from './Header.module.scss';
import logo from '../../assets/image/logo.png';
import { useEffect, useState } from 'react';
import { auth, fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
function Header() {
    let login = false;
    console.log('RUNING HEADER');
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
                    login = true;
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
                                    <button className={cx('btn')}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </Tippy>
                                <Tippy content={user} placement="bottom">
                                    <button className={cx('btn')}>
                                        <i className="fa-regular fa-user"></i>
                                    </button>
                                </Tippy>
                                <Tippy content="Log out" placement="bottom">
                                    <button className={cx('btn')} onClick={SignOut}>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </button>
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
