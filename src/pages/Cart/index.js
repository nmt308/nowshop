import { fs, auth } from '../../Config/Config';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import CartItem from '../../components/CartItem';

function Cart() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const getData = await getDocs(collection(fs, `cart-${user.uid}`));
                getData.forEach((snap) => {
                    //ID: #7 8:25
                    const cartDetail = snap.data();
                    setCarts((prev) => [...prev, cartDetail.product]);
                });
            } else {
            }
        });
    }, []);
    return (
        <div className="container">
            {carts.map((cart) => {
                return <CartItem data={cart} />;
            })}
        </div>
    );
}

export default Cart;
