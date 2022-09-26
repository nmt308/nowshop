import { fs } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
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
    console.log(product);
    return (
        <div className="container">
            <div className="row">
                {product.map((product, index) => {
                    return (
                        <div className="col-lg-3" key={index}>
                            <ProductItem data={product} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
