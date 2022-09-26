import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { auth, fs } from '../../Config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CartQuantity } from '../../layouts/DefaultLayout';
export default function ProductItem({ data }) {
    const cartData = useContext(CartQuantity);

    const GetCurentUID = () => {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setUser(user.uid);
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    };
    const uid = GetCurentUID();
    let product = data;

    const addToCart = async () => {
        product['qty'] = 1;
        product['TotalPrice'] = product.qty * data.priece;
        await setDoc(doc(fs, `cart-${uid}`, product.ID), {
            product,
        });
    };
    return (
        <MDBCard>
            <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                <MDBCardImage src={data.url} fluid alt="..." />
                <a>
                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
            </MDBRipple>
            <MDBCardBody>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <MDBCardText>{data.description}</MDBCardText>
                <MDBBtn
                    href="#"
                    onClick={() => {
                        addToCart();
                        cartData.setCartChange(!cartData.cartChange);
                    }}
                >
                    Button
                </MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}
