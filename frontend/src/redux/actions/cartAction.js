import * as actionTypes from '../constants/cartConstant';

import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const rootUrl = process.env.NODE_ENV === "production"?"https://myshop-commerce.onrender.com/":"";
    const { data } = await axios.get(`${rootUrl}/api/products/${id}`);

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}