//Local
import Style from './Order.module.scss';
import empty from '../../assets/icon/emptyorder.jpg';
//Firebase
import { collection, getDocs } from 'firebase/firestore';
import { auth, fs } from '../../Config/Config';
//React
import { useState } from 'react';
import { useEffect } from 'react';
//Other
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
const cx = classNames.bind(Style);

function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const getData = await getDocs(collection(fs, `order-${user.uid}`));
                getData.forEach((snap) => {
                    const orderDetail = snap.data();
                    setOrders((prev) => [...prev, orderDetail.product]);
                });
            } else {
            }
        });
    }, []);

    return (
        <div className="container">
            {orders.length > 0 ? (
                <div className={cx('list')}>
                    {orders.map((order, index) => {
                        return (
                            <div key={index}>
                                <div className={cx('item')}>
                                    <div className={cx('image')}>
                                        <img src={order.url} alt="" />
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('name')}>{order.name}</div>
                                        <div className={cx('qty')}>Số lượng: {order.qty}</div>
                                    </div>
                                    <div className={cx('totalPrice')}>
                                        Tổng tiền:{' '}
                                        <NumericFormat
                                            value={order.TotalPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <>
                    <div className={cx('empty-cart')}>
                        <img src={empty} alt="empty" />
                        <h5>Ops! Bạn chưa có đơn hàng nào</h5>
                    </div>
                </>
            )}
        </div>
    );
}

export default Order;
