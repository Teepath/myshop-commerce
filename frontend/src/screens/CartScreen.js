import './CartScreen.css'
import CartItem from "../components/CartItem"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart} from "../redux/actions/cartAction";

const CartScreen = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(qty + item.qty), 0)
    }

    const getCartSubTotal = () => {
        return cartItems.reduce((price, item)=> (item.price *item.qty) + price, 0)
    }
    return (
        <div className="cartscreen">
            <div className="cartscreen__left">
                <h2> Shopping Cart</h2>
                {
                    cartItems.length === 0 ? (
                        <div>
                            Your carty is empty <Link to='/'> Go back</Link>

</div>

                    ) : cartItems.map((item) => (
                        <CartItem item={item} qtyChangeHandler={qtyChangeHandler} removeFromCartHandler={removeFromCartHandler} key={ item.id}/>
                    ))
               }
            </div>
            <div className="cartscreen__right">
            <div className="cartscreen__info">
                <p> Subtotal ({getCartCount()}) items</p>
                    <p> ${ getCartSubTotal().toFixed(2)}</p>
                </div>
            <div>
                <button> Proceed To Checkout</button>
                </div>
                </div>
        </div>
    )
}

export default CartScreen