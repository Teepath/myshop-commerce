import * as actionTypes from '../constants/paymentConstant';


export const payReducer = (state = { paymentUrl: null, loading:false, message:null, error:null }, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_PAYMENT:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.PAYMENT:
            return{
                ...state,
                loading:false,
                paymentUrl: action.payload,
                message:null,
                error:null
            }
        case actionTypes.PAYMENT_FAIL:
            return{
                ...state,
                paymentUrl:null,
                loading:false,
                error: action.payload,
            }
        
        default:
            return state;

    }
}