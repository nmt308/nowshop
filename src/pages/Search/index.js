import { fs } from '../../Config/Config';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../../layouts/DefaultLayout';
import ProductItem from '../../components/ProductItem';
import './Search.scss';
import Button from '../../components/Button';
let newBrand = [];
function Search() {
    const dataSearch = useContext(SearchContext);
    const [product, setProduct] = useState([]);
    const [render, setRender] = useState('');
    const [filter, setFilter] = useState('');

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

    let searchResult = product.filter((product) =>
        product.name.toLowerCase().includes(dataSearch.searchContext.toLowerCase()),
    );

    let dataRender = searchResult;
    let newFilters = [];

    if (render.length > 0) {
        dataRender = render;
    }

    const filterBrand = (data) => {
        if (newBrand.includes(data)) {
            if (newBrand.length > 1) {
                //Phải lớn hơn 1 nếu không khi mảng có 1 phần tử uncheck sẽ còn phần tử đó
                newBrand = newBrand.filter((x) => {
                    return x !== data;
                });
            } else if (newBrand.length === 1) {
                newBrand = [];
            }
        } else {
            newBrand.push(data);
        }
        if (newBrand.length > 0) {
            newBrand.forEach((category) => {
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
        newBrand = [];
    };
    return (
        <div className="container page-content">
            <div className="row ">
                <div className="col-lg-2">
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
                                checked={newBrand.includes('phone')}
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
                                checked={newBrand.includes('laptop')}
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
                    <div className="row row-cols-5 custom-row">
                        {dataRender.map((data, index) => (
                            <div className="col" key={index}>
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
