import { fs } from '../../Config/Config';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../../layouts/DefaultLayout';
import ProductItem from '../../components/ProductItem';
function Search() {
    const dataSearch = useContext(SearchContext);
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
    const searchResult = product.filter((product) =>
        product.name.toLowerCase().includes(dataSearch.searchContext.toLowerCase()),
    );
    console.log('Search data:', searchResult);
    return (
        <div className="container">
            <div className="row">
                <div className="mt-4 col-lg-2">Lọc dữ liệu</div>
                <div className="col-lg-10">
                    <div className="row">
                        {searchResult.map((data, index) => (
                            <div className="mt-4 col-lg-3">
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
