import * as actionTypes from '../constants/productConstant';

export const getProductReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error:action.payload,
            }
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
                };
        case actionTypes.CREATE_PRODUCT_FAIL:
            return {
                loading: false,
               error: action.payload,
            };
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
       
        
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.map((product) =>
                    product.id === action.payload.id? action.payload : product
                ),
            };
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
            
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter((product) => product._id!== action.payload),
            };
        case actionTypes.DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
            
      

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