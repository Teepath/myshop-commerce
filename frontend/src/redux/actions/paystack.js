import * as actionTypes from '../constants/paymentConstant';

import axios from 'axios';



export const payStackHandleAction = (info)=> async (dispatch)=>{

    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_PAYMENT})
    try{
        
        const { data } = await axios.post(`${rootUrl}/api/users/payment/pay`, info);

        console.log(data, 'pay')
        dispatch({
            type: actionTypes.PAYMENT,
            payload: data.paymentUrl

        })

    }catch(err){
        
        console.log(err, 'pay err')
        dispatch({
            type: actionTypes.PAYMENT_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })

    }
   
}