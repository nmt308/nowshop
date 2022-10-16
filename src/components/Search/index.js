// import { wrapper as PopperWrapper } from '../../../../components/Popper';
import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
// import AccountItem from '../../../../components/AccountItem';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Style from './Search.module.scss';
import { useDebounce } from '../../CustomHook';
import classNames from 'classnames/bind';
import { SearchContext } from '../../layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { fs } from '../../Config/Config';
import SearchItem from '../SearchItem';

import { DetailProduct } from '../../layouts/DefaultLayout';

const cx = classNames.bind(Style);
function Search() {
    const navigate = useNavigate();
    const productDetail = useContext(DetailProduct);
    const search = useContext(SearchContext);
    const [searchResult, setSearchResult] = useState([]);
    const [value, setValue] = useState('');
    const [hideToolTip, setToolTip] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounce = useDebounce(value, 500);

    const handleTooltip = () => {
        setToolTip(false);
    };
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

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            setLoading(false);
            return;
        }
        const searchProducts = async () => {
            const getData = await getDocs(collection(fs, 'products'));
            getData.forEach((snap) => {
                const product = snap.data();
                product.ID = snap.id;
                if (product.name.toLowerCase().includes(debounce.toLowerCase())) {
                    setSearchResult((products) => [...products, product]);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        };
        searchProducts();
        return () => {
            setLoading(true);
            setSearchResult([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    return (
        <HeadlessTippy
            interactive
            visible={(hideToolTip && searchResult.length > 0) || (loading && searchResult.length === 0)}
            render={(attrs) => (
                <div className={cx('result')} tabIndex="-1" {...attrs}>
                    <div className={cx('wrapper')}>
                        <span className={cx('title')}>Sản phẩm</span>
                        {searchResult.map((item, index) => {
                            return (
                                <SearchItem
                                    data={item}
                                    key={index}
                                    onClick={() => {
                                        productDetail.setDetail(item);
                                        setValue('');
                                        setSearchResult([]);
                                    }}
                                />
                            );
                        })}
                        {loading && searchResult.length === 0 && (
                            <div className={cx('loading')}>
                                <div className={cx('loading-avt')}></div>
                                <div className={cx('loading-info')}>
                                    <div className={cx('loading-name')}></div>
                                    <div className={cx('loading-price')}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            onClickOutside={handleTooltip}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Tìm kiếm sản phẩm ..."
                    value={value}
                    onChange={handleValue}
                    onFocus={() => {
                        setToolTip(true);
                    }}
                />
                <div className={cx('searchBtn')} onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                {/* {value && !loading && <button className="" onClick={handleRemove}></button>} */}
                {/* {loading && <i className="fa-solid fa-spinner"></i>} */}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
