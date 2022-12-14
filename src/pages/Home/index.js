//Local
import ProductItem from '../../components/ProductItem';
import Carousel from '../../components/Carousel';
import { useViewport } from '../../CustomHook';
import banner from '../../assets/image/banner4.webp';
import './Home.scss';
//Firebase
import { fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
//Other
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

const cx = classNames;
function Home() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [active, setActive] = useState('all');
    const [open, setOpen] = useState(false);

    // Paginate items
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState({ current: '' });

    // Categories list
    const categories = [
        {
            type: 'all',
            name: 'Tất cả',
        },
        {
            type: 'phone',
            name: 'Điện thoại',
        },
        {
            type: 'laptop',
            name: 'Laptop',
        },
        {
            type: 'tablet',
            name: 'Máy tính bảng',
        },
        {
            type: 'electronic',
            name: 'Phụ kiện điện tử',
        },
        {
            type: 'smartdevice',
            name: 'Thiết bị thông minh',
        },
    ];

    let dataRender;
    if (category.length > 0) {
        dataRender = category;
    } else {
        dataRender = product;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter products
    const filterProduct = (category) => {
        setActive(category);
        if (category === 'all') {
            setCategory(product);
        } else {
            const filterData = product.filter(
                (product) => product.typeProduct.toLowerCase() === category.toLowerCase(),
            );
            setCategory(filterData);
        }
        setCurrentPage({ current: 0 });
        setItemOffset(0);
    };

    // Get products
    useEffect(() => {
        const getProducts = async () => {
            const getData = await getDocs(collection(fs, 'products'));
            getData.forEach((snap) => {
                const product = snap.data();
                product.ID = snap.id;
                setProduct((products) => [...products, product]);
            });
        };
        getProducts();
    }, []);

    // Handle Paginate
    useEffect(() => {
        const endOffset = itemOffset + 10;
        setCurrentItems(dataRender.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(dataRender.length / 10));
    }, [itemOffset, dataRender]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % dataRender.length;
        setItemOffset(newOffset);
        setCurrentPage('');
    };

    //Open category
    const handleMenu = (event) => {
        setOpen(!open);
    };

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 739;

    return (
        <div className="container page-content">
            <div className="row">
                <div className="col col-lg-9 ">
                    <Carousel />
                </div>
                <div className="col col-lg-3 d-none d-sm-none d-md-block">
                    <div className="policy-list">
                        <div className="policy-item">
                            <p>Bảo hành tận tâm</p>
                            <span>Bất kể giấy tờ thế nào, NowShop luôn cam kết sẽ hỗ trợ khách hàng tới cùng.</span>
                        </div>
                        <div className="policy-item">
                            <p>Miễn phí vận chuyển</p>
                            <span>100% đơn hàng đều được miễn phí vận chuyển khi thanh toán trước.</span>
                        </div>
                        <div className="policy-item">
                            <p>Đổi trả 1-1 hoặc hoàn tiền</p>
                            <span>Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng được nhu cầu.</span>
                        </div>
                    </div>
                </div>
            </div>
            <img src={banner} alt="banner" className="banner" />
            <div className={cx('row')}>
                <div className="col col-lg-2">
                    <ul
                        className={cx('list-group', {
                            active: open,
                        })}
                    >
                        <div className={cx('list-group-item')} onClick={handleMenu}>
                            <i className="fa-solid fa-list-ul"></i>
                            <span>Danh mục</span>
                        </div>
                        {categories.map((category) => {
                            return (
                                <li
                                    key={category.type}
                                    className={cx('list-group-item', {
                                        active: active === category.type,
                                    })}
                                    onClick={() => {
                                        filterProduct(category.type);
                                    }}
                                >
                                    {category.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col-lg-10">
                    <div className={cx('row', 'row-cols-xl-5', 'custom-row')}>
                        {currentItems.length > 0 ? (
                            currentItems.map((product, index) => {
                                return (
                                    <div
                                        className={isMobile ? 'col col-6' : 'col col-sm-4 col-md-4 col-lg-3 col-xl'}
                                        key={index}
                                    >
                                        <ProductItem data={product} />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="loadingio-spinner-ellipsis-r5dy8elx01r">
                                <div className="ldio-66p5as058f5">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <ReactPaginate
                        className="pagination justify-content-center"
                        forcePage={currentPage.current}
                        nextLabel="Sau >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Trước"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
