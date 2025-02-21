import './AuthScreen.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {forgotPasswordHandleAction, passwordResetHandleAction } from "../redux/actions/auth"

export default function Password() {
    const [errors, setErrors] = useState({})
    const loading = useSelector(state => state.auth.loading)
    const message = useSelector(state => state.auth.message)
    const errorMsg = useSelector(state => state.auth.error)
    const dispatch =useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
      email:'',
      token:'',
      password:'',
      confirmPassword:''
      })

    const handleRecovery = (event)=>{
        event.preventDefault();
        const {email} = data;
   
        if(email){
            dispatch(forgotPasswordHandleAction(email , navigate))
        }

        if(message){
          alert("Success", message)
        }
        
    }


    const handleResetPassword = (event)=>{
        event.preventDefault();
        const {token, password} = data;
   
        if(token, password){
            dispatch(passwordResetHandleAction(token, password))
        }
        
    }


    const handleInput = (value)=>{
   
        let errors={};
        switch(value){
            case 'email':
              if(!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                errors.email = 'Email is not valid';
              }
            
              if(data.email.trim() === ''){
                errors.email = 'Email is required';
              }
              break;

              case 'token':

                if(data.token.trim() === ''){
                errors.token = 'Please enter the token send to your email';
              }
              case 'password':
                if(data.password.length <5  || data.password.trim() ==='' ){
                  errors.password = 'Password is required and must be greater than 5 characters';
                }
                break;
              case 'confirmPassword':
                if(data.password !== data.confirmPassword || data.confirmPassword.trim() === ''){
                  errors.confirmPassword = 'Password is not matching';
                }
        
                break;
              default:
                return null;
        }
    
        if(Object.values(errors).length >0){
          setErrors(errors)
        }
       
      }

      const disableForgotBtn= ()=>{
        return data.email ==="";
      }


  return (
    <div className='form-div'>
       
      <h1 className='title'> Password Recovery</h1>
     
      <form onSubmit={handleRecovery} className='form'>
      <input type="email" placeholder="Email"  onChange={(event) => {setData({...data, email:event.target.value})}} onBlur={()=>handleInput('email')} required />
      {errors.email?
      <div className='errors'>  {errors.email}</div>
      :null}
       <button type="submit" className='button-checkout' disabled={()=>disableForgotBtn()}> {!loading?'Password Recovery': 'Loading.....'}</button>
        </form>
      

        
        <div className='message'> {message? message: null}</div>
        <div className='errors-msg'> {errorMsg? errorMsg: null}</div>

      </div>
  )
}
