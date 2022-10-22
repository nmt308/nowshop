//Local
import ProductItem from '../../components/ProductItem';
import './Search.scss';
import Button from '../../components/Button';
import { fs } from '../../Config/Config';
import { useViewport } from '../../CustomHook';
//Firebase
import { getDocs, collection } from 'firebase/firestore';
//React
import { useEffect, useState } from 'react';
import { useRef } from 'react';

function Search() {
    const dataSearch = localStorage.getItem('search');
    const [product, setProduct] = useState([]);
    const [render, setRender] = useState('');
    const [filter, setFilter] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    let newBrand = useRef([]);
    const menuRef = useRef();

    const getProducts = async () => {
        const getData = await getDocs(collection(fs, 'products'));
        getData.forEach((snap) => {
            const product = snap.data();
            product.ID = snap.id;
            setProduct((products) => [...products, product]);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    let searchResult = product.filter((product) => product.name.toLowerCase().includes(dataSearch.toLowerCase()));

    let dataRender = searchResult;
    let newFilters = [];

    if (render.length > 0) {
        dataRender = render;
    }

    const filterBrand = (data) => {
        if (newBrand.current.includes(data)) {
            if (newBrand.current.length > 1) {
                //Phải lớn hơn 1 nếu không khi mảng có 1 phần tử uncheck sẽ còn phần tử đó
                newBrand.current = newBrand.current.filter((x) => {
                    return x !== data;
                });
            } else if (newBrand.current.length === 1) {
                newBrand.current = [];
            }
        } else {
            newBrand.current.push(data);
        }
        if (newBrand.current.length > 0) {
            newBrand.current.forEach((category) => {
                searchResult.forEach((data) => {
                    if (data.category.includes(category)) {
                        newFilters.push(data);
                        if (filter === 'increase') {
                            increaseHandle(newFilters);
                        } else if (filter === 'decrease') {
                            decreaseHandle(newFilters);
                        } else if (!filter) {
                            setRender(newFilters);
                        }
                    }
                });
            });
        } else {
            if (filter === 'increase') {
                increaseHandle(searchResult);
            } else if (filter === 'decrease') {
                decreaseHandle(searchResult);
            } else if (!filter) {
                setRender(searchResult);
            }
        }
    };
    const increaseHandle = (data) => {
        const sortData = () => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].priece < data[j + 1].priece) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    }
                }
            }
            const newData = [...data];
            return newData;
        };
        setFilter('increase');
        setRender(sortData(dataRender));
    };

    const decreaseHandle = (data) => {
        const sortData = () => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].priece > data[j + 1].priece) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    }
                }
            }
            const newData = [...data];
            return newData;
        };
        setFilter('decrease');
        setRender(sortData(dataRender));
    };

    const removeFilter = () => {
        setRender(searchResult);
        setFilter('');
        newBrand.current = [];
    };

    useEffect(() => {
        if (openMenu) {
            menuRef.current.style.height = menuRef.current.scrollHeight + 4 + 'px';
        } else {
            menuRef.current.style.height = 0;
        }
    }, [openMenu]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 739;
    const isTablet = viewPort.width > 739 && viewPort.width <= 992;

    return (
        <div className="container page-content">
            {(isMobile || isTablet) && (
                <div
                    className="filter-bar"
                    onClick={() => {
                        setOpenMenu(!openMenu);
                    }}
                >
                    <i className="fa-solid fa-sliders"></i>
                    <span>Bộ lọc</span>
                </div>
            )}

            <div className="row">
                <div className="col-lg-2 filter-container" ref={menuRef}>
                    <div className="filter-price">
                        <div className="filter-title">Sắp xếp giá</div>
                        <div className="filter">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="filter"
                                checked={filter === 'increase'}
                                value="increase"
                                onChange={(e) => {
                                    increaseHandle(dataRender);
                                }}
                            />
                            <span>Tăng dần</span>
                        </div>
                        <div className="filter">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="filter"
                                checked={filter === 'decrease'}
                                value="decrease"
                                onChange={(e) => {
                                    decreaseHandle(dataRender);
                                }}
                            />
                            <span>Giảm dần</span>
                        </div>
                    </div>
                    <div className="filter-brand">
                        <div className="filter-title">Thương hiệu</div>
                        <div className="filter">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={newBrand.current.includes('phone')}
                                value="phone"
                                onChange={(e) => {
                                    filterBrand(e.target.value);
                                }}
                            />
                            <span>Iphone</span>
                        </div>

                        <div className="filter">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={newBrand.current.includes('laptop')}
                                value="laptop"
                                onChange={(e) => {
                                    filterBrand(e.target.value);
                                }}
                            />
                            <span>Laptop</span>
                        </div>
                    </div>
                    <div></div>
                    <div className="filter-remove">
                        <Button
                            className="btn btn-primary w-100"
                            onClick={() => {
                                removeFilter();
                            }}
                        >
                            Xóa bộ lọc
                        </Button>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="row row-cols-xl-5 custom-row">
                        {dataRender.map((data, index) => (
                            <div
                                className={isMobile ? 'col col-6' : 'col col-sm-4 col-md-4 col-lg-4 col-xl'}
                                key={index}
                            >
                                <ProductItem data={data} key={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
