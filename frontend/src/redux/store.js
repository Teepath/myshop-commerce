import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevtools } from 'redux-devtools-extension';

//reducers
import { cartReducer } from './reducers/cartReducers';
import { getProductDetailsReducers, getProductReducer } from './reducers/productReducers';
import { authReducer } from './reducers/auth';
import { userReducer } from './reducers/userReducer';
import { payReducer } from './reducers/paystack';


const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducers,
    auth: authReducer,
    user: userReducer,
    payment: payReducer
})

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const initialState = {
    cart: {
        cartItems: cartFromLocalStorage
    }
}
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);


export default store;