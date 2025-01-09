import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../redux/actions/auth';
import {useEffect, useState} from "react"

const Navbar = ({ click }) => {
    const cart = useSelector(state => state.cart);
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = cart;
    const {user} = useSelector(state => state.auth);
    const [myuser, setMyUser] = useState()

    // console.log(user?.role, 'sur')

    const getCartCount = () => {
        return cartItems.reduce((qty, item)=> Number(qty + item.qty), 0)
    }

    const handleLogout = ()=>{
        dispatch(logOutUser());
        navigate('/')
    }


    useEffect(()=>{
     
        let data = JSON.parse(localStorage.getItem('data'))
        console.log(data)
        setMyUser(data)
    
      }, [])

      console.log(myuser, 'myuser')
      console.log(user, 'user')
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
                {
                     user?.role === "admin"  || myuser?.role=== "admin"?
                    <li>
                    <Link to="/admin">
                        {/* icon */}
                        Dashboard
                    </Link>
                </li>
                : null
                }
                 
              
                {
                    user?.email || myuser?
                    <li>
                    <Link onClick={()=>handleLogout()}>
                        {/* icon */}
                        Logout
                        
                    </Link>
                </li>
                :
                <li>
                <Link to="/login">
                    {/* icon */}
                    Login
                    
                </Link>
            </li>


                }
              
               
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
