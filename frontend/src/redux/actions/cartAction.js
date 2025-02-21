import * as actionTypes from '../constants/cartConstant';

import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    const { data } = await axios.get(`${rootUrl}/api/products/${id}`);

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: data.data._id,
            name: data.data.name,
            category:data.data.category,
            imageUrl: data.data.imageUrl,
            price: data.data.price,
            countInStock: data.data.countInStock,
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