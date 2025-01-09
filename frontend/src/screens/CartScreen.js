import './CartScreen.css'
import { useState, useEffect } from 'react';
import CartItem from "../components/CartItem"
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect } from 'react-router-dom';
import { addToCart, removeFromCart} from "../redux/actions/cartAction";
import { useParams, useNavigate} from "react-router-dom";

const CartScreen = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth.user);
    const [tokenFromStorage, setTokenFromStorage] = useState('')
    const { cartItems } = cart;
    const params = useParams()
    const navigate = useNavigate()

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

    useEffect(()=>{
     
    
        let data = JSON.parse(localStorage.getItem('data'))
    
        let token = data?.token;
    
        setTokenFromStorage(token)
    
      }, [])


    const handleCheckout = ()=>{
        localStorage.setItem('amount', JSON.stringify( getCartSubTotal().toFixed(2)))
        !tokenFromStorage?navigate('/signin'):navigate('/checkout')
       
    }

    console.log(cartItems, 'cart data')

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
            <button onClick={()=> handleCheckout()}> Proceed To Checkout</button>
                </div>
                </div>
        </div>
    )
}

export default CartScreen