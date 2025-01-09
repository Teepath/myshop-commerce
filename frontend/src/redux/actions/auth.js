import * as actionTypes from '../constants/userConstant';
import {configureAxiosHeaders} from "../../utils/api"
import {api} from "../../utils/axiosIstance"

import axios from 'axios';
import { createStaticHandler } from '@remix-run/router';



export const registerUserHandle = (user)=> async (dispatch)=>{

    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})
    try{
        console.log('enter', user)
     
        const { data } = await api.post(`/register/register`, user);

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


export const loginUserHandle = (user, navigate) => async(dispatch)=>{
    const rootUrl = process.env.REACT_APP_BASE_URL;
    dispatch({type: actionTypes.REQUEST_USER})
    try{
        const { data } = await api.post(`/login/login`, user);

        console.log(data, 'login success')
        localStorage.setItem('token', data?.token);
       await  configureAxiosHeaders(data?.token)

       console.log(configureAxiosHeaders(data?.token), 'login success')
    
        localStorage.setItem('data', JSON.stringify(data?.data.user));
        dispatch({
            type:actionTypes.LOGIN_USER,
            payload:data.data.user
        })
        const amount =JSON.parse(localStorage.getItem('amount'));
        // if(amount){
        //     navigate("/checkout")
        // }
        // else{
        //     navigate('/')
        // }
      
       
    }catch(err){
        console.log(err, 'request error')
        dispatch({
            type: actionTypes.LOGIN_USER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }
}



export const logOutUser = () => async(dispatch)=>{
    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})
    localStorage.clear();
    try{
        const { data } = await api.post(`/login/logout`);
    
      
        dispatch({
            type:actionTypes.LOGOUT_USER,
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


export const VerifyEmailHandler = (token)=> async(dispatch) => {
    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})
    try {
        const response = await api.get(`/register/verify?token=${token}`);
      
        console.log(response.data);
        localStorage.setItem('data', JSON.stringify(response?.data?.data.user));
    
        dispatch({
          type:actionTypes.VERIFY_USER_EMAIL,
          payload:response?.data.data.user
      })
        // alert(response.data.data.status);
      } catch (err) {
        // setStatus('Verification failed. Please try again.');
        console.log(err, 'request error')
        dispatch({
            type: actionTypes.VERIFY_USER_EMAIL_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message : err.message
        })
    }
      
}



export const forgotPasswordHandleAction = (email)=>async(dispatch)=>{
    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})

    try{
        const { data } = await api.post(`/users/password/forgot-password`, {email:email});

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
    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";
    dispatch({type: actionTypes.REQUEST_USER})

    try{
        const { data } = await api.post(`/users/password/reset-password/${token}`, {token, password });

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
    // const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";

    const { data } = await api.post(`/users/${userId}`);


}