import Style from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
function CartItem({ data, deleteProduct, increaseQty, decreaseQty }) {
    const cx = classNames.bind(Style);
    return (
        <tr>
            <td>
                <figure className={cx('itemside')}>
                    <div className={cx('aside')}>
                        <img src={data.url} className={cx('imgProduct')} alt="product" />
                    </div>
                    <figcaption className={cx('info')}>
                        <div href="#" className={cx('title', 'text-dark')}>
                            {data.name}
                        </div>
                    </figcaption>
                </figure>
            </td>
            <td>
                <div className={cx('product-text', 'quantity-box')}>
                    <div className={cx('action-btns', 'minus')} onClick={decreaseQty}>
                        <button>-</button>
                    </div>
                    <div className={cx('qty')}>{data.qty}</div>
                    <div className={cx('action-btns', 'plus')} onClick={increaseQty}>
                        <button>+</button>
                    </div>
                </div>
            </td>
            <td>
                <div className={cx('price-wrap')}>
                    <small className={cx('text-muted')}>
                        <NumericFormat
                            value={data.TotalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' VNĐ'}
                        />{' '}
                    </small>
                </div>
            </td>
            <td>
                <div className={cx('btn btn-danger btn-md cart-btn', 'custom-btn')} onClick={deleteProduct}>
                    XÓA
                </div>
            </td>
        </tr>
    );
}

export default CartItem;
