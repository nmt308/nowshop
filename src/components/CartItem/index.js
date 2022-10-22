import Style from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';

const cx = classNames.bind(Style);
function CartItem({ data, deleteProduct, increaseQty, decreaseQty }) {
    return (
        <div className={cx('item')}>
            <div className={cx('info')}>
                <div className={cx('aside')}>
                    <img src={data.url} className={cx('imgProduct')} alt="product" />
                </div>
                <div className={cx('name')}>
                    <div className={cx('title', 'text-dark')}>{data.name}</div>
                </div>
            </div>
            <div className={cx('price-wrap')}>
                <small className={cx('text-muted')}>
                    <NumericFormat
                        value={data.TotalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Tổng tiền: '}
                        suffix={' VNĐ'}
                    />{' '}
                </small>
            </div>
            <div className={cx('action', ' d-flex gap-2')}>
                <div className={cx('product-text', 'quantity-box')}>
                    <div className={cx('action-btns', 'minus')} onClick={decreaseQty}>
                        <button>-</button>
                    </div>
                    <div className={cx('qty')}>{data.qty}</div>
                    <div className={cx('action-btns', 'plus')} onClick={increaseQty}>
                        <button>+</button>
                    </div>
                </div>
                <div className={cx('btn btn-danger btn-md cart-btn', 'custom-btn')} onClick={deleteProduct}>
                    XÓA
                </div>
            </div>
        </div>
    );
}

export default CartItem;
