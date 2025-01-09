import * as actionTypes from '../constants/productConstant'
import {api} from "../../utils/axiosIstance"

import axios from 'axios';

// const rootUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_BASE_URL
//     : "http://localhost:5000"; // Default local backend URL

const rootUrl = `${process.env.REACT_APP_BASE_URL}`

export const getproducts = (page = 1, limit = 10) => async (dispatch) => {
  try {
    // Dispatch the request action
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    // Ensure rootUrl is set correctly
    if (!rootUrl) {
      throw new Error("Base URL is not defined. Check your environment variables.");
    }

    // Make the API call
    const { data } = await axios.get(`${rootUrl}/api/products/all?page=${page}&limit=${limit}`);

    console.log("Fetched products data:", data.products);

    // Dispatch the success action
    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data, // Expected to contain products and metadata
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Dispatch the failure action with a descriptive error message
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred while fetching products.",
    });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST, })
        const { data } = await api.get(`/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        console.log('data details', data.data)

        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data?.data,
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET
    })
}

export const addProduct = (product) =>async (dispatch) => {
    try{

        // dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST, })

        const { data } = await api.post(`/products`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        dispatch({
            type: actionTypes.CREATE_PRODUCT_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}



export const updateProductAction = (product) =>async (dispatch) => {
    try{

        // dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST, })

        const { data } = await api.put(`/products/${product._id}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        dispatch({
            type: actionTypes.UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const deleteProductAction = (productId) =>async (dispatch) => {
    try{

        // dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST, })

        const { data } = await api.delete(`/products/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        dispatch({
            type: actionTypes.DELETE_PRODUCT_SUCCESS,
            payload: productId,
        })

    }catch(error){
        dispatch({
            type: actionTypes.DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}