import React,{useState, useEffect, alert} from 'react'
import api from '../utils/api';
import { configureAxiosHeaders } from '../utils/api';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as actionTypes from '../redux/constants/userConstant';
import { useDispatch, useSelector } from 'react-redux';
import {VerifyEmailHandler} from '../redux/actions/auth'

function Checkout() {

  const [isLoading, setIsLoading] = useState(false)
  const [tokenFromStorage, setTokenFromStorage] = useState('')
  const {user} = useSelector((state)=> state.auth)
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState('')
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState()

  

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      setTokenFromStorage(token)
      dispatch(VerifyEmailHandler(token))
      // try {
      //   const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/register/verify?token=${token}`);
      //   setStatus(response.data.success);
      //   console.log(response.data);
      //   localStorage.setItem('data', JSON.stringify(response?.data?.data.user));
      //  setEmail(response?.data.data.user.email)
      //   dispatch({
      //     type:actionTypes.LOGIN_USER,
      //     payload:response?.data.data.user
      // })
      //   // alert(response.data.data.status);
      // } catch (err) {
      //   // setStatus('Verification failed. Please try again.');
      // }
    };
if(searchParams ){
  verifyEmail();
}
// if(!tokenFromStorage){
// navigate('/signin')
// }
  
  }, [])

  useEffect(()=>{
    let amount = JSON.parse(localStorage.getItem('amount'))
    setAmount(amount);

    let data = JSON.parse(localStorage.getItem('data'))

    console.log(data?.email, 'frm st')

    let email = data?.email

    setEmail(email);

    let token = data?.token;
    configureAxiosHeaders(token)

    setTokenFromStorage(token)

  }, [])

  const payStackPopup =async ()=>{
    setIsLoading(true)
    try{
  
      const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"http://localhost:5000";
  
      if((user|| email) && amount){
    
      const payload ={
        email,
        amount,
      }
    
    
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/payment/pay`, payload)
    
      // const verify = await axios.post(`${rootUrl}/api/users/payment/verify`, data.reference);
    
      // console.log(verify)
      console.log(data, 'paydata')
    
      window.location= data.authorizationUrl
      setIsLoading(false)
    
      }
  
    }catch(err){
      setIsLoading(false)
      console.log(err)
      // alert(err.response && err.response.data.message
      //   ? err.response.data.message : err.message)

      console.log(err.response && err.response.data.message)
    }
  
  
  
    setIsLoading(false)
  
  
  }


 
  console.log(email, 'user')
  console.log(amount, 'amount')

 
  return (
    
    <div className='checkout-wrapper'> 
   
      <button className='button-checkout' onClick={()=> payStackPopup()}> {!isLoading?"Make Payment":"Loading...."}</button>
   
             
                
                  </div>
  )
}

export default Checkout
