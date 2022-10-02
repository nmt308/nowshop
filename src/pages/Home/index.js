import { fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import Carousel from '../../components/Carousel';
import './Home.scss';
import classNames from 'classnames';
const cx = classNames;
function Home() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [active, setActive] = useState('all');
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
            type: 'accessory',
            name: 'Phụ kiện điện tử',
        },
        {
            type: 'smart device',
            name: 'Thiết bị thông minh',
        },
    ];
    const getProducts = async () => {
        const getData = await getDocs(collection(fs, 'products'));
        getData.forEach((snap) => {
            const product = snap.data();
            product.ID = snap.id;
            setProduct((products) => [...products, product]);
        });
    };

    const filterProduct = (category) => {
        setActive(category);
        if (category === 'all') {
            setCategory(product);
        } else {
            const filterData = product.filter((product) =>
                product.category.toLowerCase().includes(category.toLowerCase()),
            );
            setCategory(filterData);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    let dataRender;
    if (category.length > 0) {
        dataRender = category;
    } else {
        dataRender = product;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-9">
                    <Carousel />
                </div>
                <div className="col col-lg-3">
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
            <div className="row">
                <div className="col col-lg-3">
                    <ul className="list-group">
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
                <div className="col-lg-9">
                    <div className="row">
                        {dataRender.map((product, index) => {
                            return (
                                <div className="col col-lg-3" key={index}>
                                    <ProductItem data={product} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
