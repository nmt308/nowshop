import Button from '../Button';
import Style from './CartItem.module.scss';
import classNames from 'classnames/bind';
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
                    <var className={cx('price')}>{data.price}</var>
                    <small className={cx('text-muted')}> {data.TotalPrice} </small>
                </div>
            </td>
            <td className={cx('text-right')}>
                <div className="btn btn-danger btn-md cart-btn" onClick={deleteProduct}>
                    DELETE
                </div>
            </td>
        </tr>
    );
}

export default CartItem;
