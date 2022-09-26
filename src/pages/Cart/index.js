import { fs, auth } from '../../Config/Config';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect, useRef, useContext } from 'react';
import CartItem from '../../components/CartItem';
import { CartQuantity } from '../../layouts/DefaultLayout';
function Cart() {
    console.log('re render Cart');
    const [carts, setCarts] = useState([]);
    const [qtyChange, setQtyChange] = useState(true);
    const cartData = useContext(CartQuantity);
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

    const deleteProduct = async (id) => {
        cartData.setCartChange(!cartData.cartChange);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await deleteDoc(doc(fs, `cart-${user.uid}`, `${id}`));
                setCarts(() => {
                    return carts.filter((cart) => cart.ID !== id);
                });
            } else {
                console.log('Error deleting');
            }
        });
    };

    let product;
    const increaseQty = async (cart, id) => {
        product = cart;
        product.qty = product.qty + 1;
        product.TotalPrice = product.priece * product.qty;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await updateDoc(doc(fs, `cart-${user.uid}`, `${id}`), {
                    product,
                });
            } else {
                console.log('Error increaseQty');
            }
        });
        setQtyChange(!qtyChange);
    };

    const decreaseQty = async (cart, id) => {
        product = cart;
        product.qty = product.qty - 1;
        product.TotalPrice = product.priece * product.qty;
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await updateDoc(doc(fs, `cart-${user.uid}`, `${id}`), {
                    product,
                });
            } else {
                console.log('Error decreaseQty');
            }
        });
        setQtyChange(!qtyChange);
    };

    const TotalProduct = carts.reduce((total, cart) => {
        return total + cart.qty;
    }, 0);
    const TotalPrice = carts.reduce((total, cart) => {
        return total + cart.TotalPrice;
    }, 0);
    return (
        <div className="container">
            {carts.map((cart, index) => {
                return (
                    <CartItem
                        data={cart}
                        key={index}
                        deleteProduct={() => {
                            deleteProduct(cart.ID);
                        }}
                        increaseQty={() => {
                            increaseQty(cart, cart.ID);
                        }}
                        decreaseQty={() => {
                            decreaseQty(cart, cart.ID);
                        }}
                    />
                );
            })}
            <div className="box">
                <p>TotalPrice: {TotalPrice}</p>
                <p>TotalProduct: {TotalProduct}</p>
            </div>
        </div>
    );
}

export default Cart;
