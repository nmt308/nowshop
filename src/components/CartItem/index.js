function CartItem({ data }) {
    return (
        <div className="cart-item">
            <p>{data.name}</p>
            <p>{data.description}</p>
        </div>
    );
}

export default CartItem;
