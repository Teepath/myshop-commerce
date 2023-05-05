import * as actionTypes from '../constants/userConstant';

import axios from 'axios';
import { createStaticHandler } from '@remix-run/router';



export const registerUserHandle = (user)=> async (dispatch)=>{

    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})
    try{
        console.log('enter', user)
     
        const { data } = await axios.post(`${rootUrl}/api/register/register`, user);

        console.log(data, 'success')


        dispatch({
            type: actionTypes.REGISTER_USER,
            payload: data
        })

    }catch(err){
    
        dispatch({
            type: actionTypes.REGISTER_USER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })

    }
   
}


export const loginUserHandle = (user) => async(dispatch)=>{
    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})
    try{
        const { data } = await axios.post(`${rootUrl}/api/login/login`, user);
    
        localStorage.setItem('data', JSON.stringify(data));
        dispatch({
            type:actionTypes.LOGIN_USER,
            payload:data
        })

     
    }catch(err){
        console.log(err, 'request error')
        dispatch({
            type: actionTypes.LOGIN_USER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }
}



export const forgotPasswordHandleAction = (email)=>async(dispatch)=>{
    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})

    try{
        const { data } = await axios.post(`${rootUrl}/api/users/password/forgot-password`, {email:email});

        console.log(data.message, 'forgot')

        dispatch({
            type:actionTypes.FORGOT_PASSWORD,
            payload:data.message
        })

    }catch(err){
        console.log('err', err)
        dispatch({
            type: actionTypes.FORGET_PASSWORD_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }

}


export const passwordResetHandleAction = (token, password)=>async(dispatch)=>{
    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})

    try{
        const { data } = await axios.post(`${rootUrl}/api/users/password/reset-password/${token}`, {token, password });

        console.log(data.message, 'reset')

        dispatch({
            type:actionTypes.GET_PASSWORDRESET,
            payload:data.message
        })

    }catch(err){
        console.log('err', err)
        dispatch({
            type: actionTypes.GET_PASSWORDRESET_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }

}

export const getUserHandle = (userId)=>async(dispatch)=>{
    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";

    const { data } = await axios.post(`${rootUrl}/api/users/${userId}`);


}