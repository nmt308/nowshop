import Button from '../Button';
import Style from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import FreeShipIcon from '../../assets/icon/freeship';
import { NumericFormat } from 'react-number-format';

const cx = classNames.bind(Style);
export default function ProductItem({ data }) {
    const discount = Math.ceil(data.oldprice / data.priece);

    return (
        <div className={cx('product-item')}>
            <Button
                to={`/${data.name}-detail`}
                onClick={() => {
                    localStorage.setItem('productDetail', JSON.stringify(data));
                }}
            >
                <div className={cx('product-img')}>
                    <img src={data.url} alt="Product" />
                </div>
                <div>
                    <div className={cx('product-title')}>
                        <div className={cx('product-name')}>{data.name}</div>
                        <FreeShipIcon />
                    </div>
                    <div className={cx('price')}>
                        <div className={cx('product-oldprice')}>
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
                </div>
            </Button>
            <div className={cx('discount')}>
                <p>Giảm {discount}%</p>
            </div>
        </div>
    );
}
