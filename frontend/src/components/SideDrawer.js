import './SideDrawer.css';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logOutUser } from '../redux/actions/auth';
const SideDrawer = ({ show, click }) => {
    const sideDrawerClass = ["sidedrawer"]
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const [myUser, setMyUser] = useState(null);

    if (show) {
        sideDrawerClass.push('show');
    }

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;


    useEffect(()=>{
     
        let data = JSON.parse(localStorage.getItem('data'))
        console.log(data)
        setMyUser(data)
    
      }, [])


    const handleLogout = ()=>{
        dispatch(logOutUser());
        navigate('/')
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item)=> Number(qty + item.qty), 0)
    }
    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className="sidedrawer__links" onClick={click}>
                <li>
                    <Link to=":id/cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
                            Cart <span className="sidedrawer__cartbadge">{getCartCount()} </span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/"> Shop</Link>
                </li>
                {
                     user?.role === "admin"  || myUser?.role=== "admin"?
                    <li>
                    <Link to="/admin">
                        {/* icon */}
                        Dashboard
                    </Link>
                </li>
                : null
                }
              
                {
                    user || myUser?
                    <li >
                    <Link to="/"  onClick={()=>handleLogout()}>
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
            
        </div>
    )
}

export default SideDrawer
