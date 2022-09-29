import { useContext } from 'react';
import { DetailProduct } from '../../layouts/DefaultLayout';
function ProductDetail() {
    const detailProduct = useContext(DetailProduct);
    return (
        <>
            {detailProduct.detail.name}
            {detailProduct.detail.priece}
        </>
    );
}

export default ProductDetail;
