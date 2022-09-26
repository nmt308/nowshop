function CartItem({ data, deleteProduct, increaseQty, decreaseQty }) {
    console.log('cart item running');
    return (
        <div className="cart-item">
            <p>{data.name}</p>
            <p>{data.ID}</p>
            <p>{data.price}</p>
            <div className="product-text quantity-box">
                <div className="action-btns minus" onClick={decreaseQty}>
                    <button>-</button>
                </div>
                <div className="qty">{data.qty}</div>
                <div className="action-btns plus" onClick={increaseQty}>
                    <button>+</button>
                </div>
            </div>
            <div className="product-text cart-price">$ {data.TotalPrice}</div>
            <div className="btn btn-danger btn-md cart-btn" onClick={deleteProduct}>
                DELETE
            </div>
        </div>
    );
}

export default CartItem;
