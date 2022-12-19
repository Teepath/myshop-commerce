import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevtools } from 'redux-devtools-extension';

//reducers
import { cartReducer } from './reducers/cartReducers';
import { getProductDetailsReducers, getProductReducer } from './reducers/productReducers';


const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducers
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