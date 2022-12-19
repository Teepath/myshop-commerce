import * as actionTypes from '../constants/productConstant';

export const getProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error:action.payload,
            }
        default:
            return state;
    }
}

export const getProductDetailsReducers = (state = { product: {} }, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
            }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loadin: false.valueOf,
                error: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return {
                product: {}
            };
        default:
            return state;
    }
}