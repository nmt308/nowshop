//Local
import ProductItem from '../../components/ProductItem';
import './Search.scss';
import Button from '../../components/Button';
import { fs } from '../../Config/Config';
import { useViewport } from '../../CustomHook';
import NotFound from '../../assets/icon/notfound.png';
//Firebase
import { getDocs, collection } from 'firebase/firestore';
//React
import { useEffect, useState } from 'react';
import { useRef } from 'react';
/*Toastify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../components/Toast';

function Search() {
    const dataSearch = localStorage.getItem('search');
    const [render, setRender] = useState('');
    const [filter, setFilter] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    let newBrand = useRef([]);
    const menuRef = useRef();

    const listBrand = [
        { value: 'xiaomi', label: 'Xiaomi' },
        { value: 'apple', label: 'Apple' },
        { value: 'oppo', label: 'Oppo' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'asus', label: 'Asus' },
        { value: 'dell', label: 'Dell' },
    ];

    const getProducts = async () => {
        const getData = await getDocs(collection(fs, 'products'));
        let searchResult = [];
        getData.forEach((snap) => {
            const product = snap.data();
            product.ID = snap.id;
            searchResult.push(product);
            localStorage.setItem('getProducts', JSON.stringify(searchResult));
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const getResult = JSON.parse(localStorage.getItem('getProducts')) || [];
    let searchResult = getResult.filter((product) => product.name.toLowerCase().includes(dataSearch.toLowerCase()));

    let dataRender = searchResult;
    let newFilters = [];

    if (render.length > 0) {
        dataRender = render;
    }

    const filterBrand = (data) => {
        //Kiểm tra brand đã có trong list chưa để uncheck
        if (newBrand.current.includes(data)) {
            if (newBrand.current.length > 1) {
                //Phải lớn hơn 1 nếu không khi mảng có 1 phần tử uncheck sẽ còn phần tử đó
                newBrand.current = newBrand.current.filter((x) => {
                    return x !== data;
                });
                console.log('remove:', newBrand.current);
            } else if (newBrand.current.length === 1) {
                newBrand.current = [];
            }
        } else {
            //Trước khi lưu vào list, kiểm tra danh sách sản phẩm có brand đó không
            const listBrandAvailable = [];
            searchResult.forEach((result) => {
                listBrandAvailable.push(result.brand);
            });
            if (listBrandAvailable.includes(data)) {
                newBrand.current.push(data);
                console.log(newBrand.current);
            } else {
                notify('error', 'Không có hãng tương ứng !');
            }
        }
        // Lấy dữ liệu các sản phẩm có brand nằm trong newBrand
        if (newBrand.current.length > 0) {
            newBrand.current.forEach((item) => {
                searchResult.forEach((data) => {
                    if (data.brand === item) {
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
        window.scrollTo(0, 0);
    }, []);

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 739;
    const isTablet = viewPort.width > 739 && viewPort.width <= 992;

    useEffect(() => {
        if (searchResult.length > 0 && (isMobile || isTablet)) {
            if (openMenu) {
                menuRef.current.style.height = menuRef.current.scrollHeight + 4 + 'px';
            } else {
                menuRef.current.style.height = 0;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu]);

    return (
        <div className="container page-content">
            {searchResult.length === 0 && (
                <div className="notFound">
                    <img src={NotFound} alt="File not found" className="w-100" />
                    <h5>Không tìm thấy sản phẩm nào</h5>
                </div>
            )}
            {(isMobile || isTablet) && searchResult.length > 0 && (
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
                {searchResult.length > 0 && (
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
                            {listBrand.map((brand, i) => {
                                return (
                                    <div className="filter" key={i}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={newBrand.current.includes(brand.value)}
                                            value={brand.value}
                                            onChange={(e) => {
                                                filterBrand(e.target.value);
                                            }}
                                        />
                                        <span>{brand.label}</span>
                                    </div>
                                );
                            })}
                        </div>

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
                )}
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
            <ToastContainer />
        </div>
    );
}

export default Search;
