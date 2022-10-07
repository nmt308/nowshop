import { auth, fs } from '../../Config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CartQuantity } from '../../layouts/DefaultLayout';
import { DetailProduct } from '../../layouts/DefaultLayout';
import Button from '../Button';
import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import FreeShipIcon from '../../assets/icon/freeship';
import { NumericFormat } from 'react-number-format';
export default function ProductItem({ data }) {
    const cx = classNames.bind(Style);
    const productDetail = useContext(DetailProduct);
    const discount = Math.ceil(data.oldprice / data.priece);

    return (
        <div className={cx('product-item')}>
            <Button
                to={`/${data.name}-detail`}
                onClick={() => {
                    productDetail.setDetail(data);
                }}
            >
                <div className={cx('product-img')}>
                    <img src={data.url} alt="Product" />
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <div className={cx('product-name')}>{data.name}</div>
                    <FreeShipIcon />
                </div>
                <div className={cx('price')}>
                    <div className={cx('product-oldprice', 'text-decoration-line-through')}>
                        <NumericFormat
                            value={data.oldprice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' VNĐ'}
                        />
                    </div>
                    <div className={cx('product-price')}>
                        <NumericFormat
                            value={data.priece}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' VNĐ'}
                        />
                    </div>
                </div>
            </Button>
            <div className={cx('discount')}>
                <p>Giảm {discount}%</p>
            </div>
        </div>
    );
}
