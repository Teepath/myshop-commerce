import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ click }) => {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item)=> Number(qty + item.qty), 0)
    }
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <h2>Vctee Shop & Store</h2>
            </div>
            {/* links */}

            <ul className="navbar__links">
                <li>
                    <Link to=":id/cart" className="cart__link">
                    <i className="fas fa-shopping-cart"> </i>
                        <span>Cart
                            <span className="cartlogo__badge"> { getCartCount()}</span>
                        </span>
                    </Link>
                    </li>
                    <li>
                    <Link to="/">
                        {/* icon */}
                        Shop
                    </Link>
                </li>
               
            </ul>
            {/* hamburger */}
            <div className="hamburger__menu" onClick={click}>
                <div> </div>
                <div> </div>
                <div> </div>
            </div>
        </nav>
    )
}

export default Navbar
