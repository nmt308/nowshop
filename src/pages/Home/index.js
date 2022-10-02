import { fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import Carousel from '../../components/Carousel';
import './Home.scss';
function Home() {
    const [product, setProduct] = useState([]);

    const getProducts = async () => {
        const getData = await getDocs(collection(fs, 'products'));
        console.log(getData);
        getData.forEach((snap) => {
            const product = snap.data();
            product.ID = snap.id;
            setProduct((products) => [...products, product]);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

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
                        <li className="list-group-item">Catalogy</li>
                        <li className="list-group-item">All Product</li>
                        <li className="list-group-item">SmartPhone</li>
                        <li className="list-group-item">Laptop</li>
                        <li className="list-group-item">SmartWatch</li>
                        <li className="list-group-item">Other</li>
                    </ul>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {product.map((product, index) => {
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
