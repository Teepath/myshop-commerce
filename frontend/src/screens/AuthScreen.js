import './AuthScreen.css'
import React, { useEffect, useState} from 'react';
import {useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {registerUserHandle, loginUserHandle} from "../redux/actions/auth"
import { payStackHandleAction} from "../redux/actions/paystack";
import axios from 'axios';



const PaystackForm = () => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const paymentUrl =useSelector(state => state.payment.paymentUrl);
    const [checkout, setCheckout] = useState(false)
    const token = useSelector(state => state.auth?.user)
    const loading = useSelector(state => state.auth.loading)
    const [isLoading, setIsLoading] = useState(false)
    const [tokenFromStorage, setTokenFromStorage] = useState('')
    const [amount, setAmount] = useState('')
    const [email, setEmail] = useState()
    const[isLogin, setIsLogin] = useState(false)
    const dispatch =useDispatch()
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmPassword:''
    })
  // const [, setFirstname] = useState('');
  // const [, setLastname] = useState('');
  // const [phone, setPhone] = useState('');
  // const [, setEmail] = useState('');
  // const [, setPassword] = useState('');
  // const [, setConfirmPassword] = useState('');

  useEffect(()=>{
    let amount = JSON.parse(localStorage.getItem('amount'))
    setAmount(amount);

    let data = JSON.parse(localStorage.getItem('data'))

    let email = data?.user?.email;

    setEmail(email);

    let token = data?.token;

    setTokenFromStorage(token)

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {phone, email, password, lastname, firstname} = data;

    const payload ={
      firstName:firstname,
      lastName:lastname,
      email:email,
      password:password,
      phone,
  
    }

    console.log(payload, 'pay')

    if(!Object.values(errors).length >0){

      dispatch(registerUserHandle(payload))
    }

    setTimeout(() => {
      alert("User registered successfully, check your email for further instruction")
    
    }, 3000);

    
    navigate('/login')
    // const { data } = await axios.post('/pay', payload);
    // window.location.href = data.authorization_url;
  };


  


  const handleLogin = async (event)=>{
    event.preventDefault()
    const {email, password} = data;
    const payload ={
      email:email,
      password:password,
    }

  

    if(email && password){
      dispatch(loginUserHandle(payload))

    }

   setCheckout(true)
  

  }

  console.log(paymentUrl, 'url')

const payStackPopup =async ()=>{

  try{

    setIsLoading(true)
    const rootUrl = process.env.NODE_ENV === "production"?process.env.REACT_APP_BASE_URL:"";

    if(email && amount){
  
    const payload ={
      email,
      amount,
    }
  
  
    const { data } = await axios.post(`${rootUrl}/api/users/payment/pay`, payload)
  
    // const verify = await axios.post(`${rootUrl}/api/users/payment/verify`, data.reference);
  
    // console.log(verify)
  
    window.location= data.paymentUrl
  
    }

  }catch(err){
    alert(err.response && err.response.data.message
      ? err.response.data.message : err.message)
  }



  setIsLoading(false)


}


  const disableBtn = ()=>{
    return data.firstname ==='' || data.lastname ==='' || data.email ==='' || data.password ==='' || data.phone ===''
  }

  const disableLogin = ()=>{
    return data.email ==="" ||data.password ==='';
  }

  const handleInput = (value)=>{
    let errors={};
    switch(value){
      case 'firstname':
      if(data.firstname.trim() === ''){
        errors.firstname = 'First name is required';
      }
      case 'lastname':
        if(!data.lastname){
          errors.lastname = 'Last name is required';
        }
        case 'email':
          if(!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            errors.email = 'Email is not valid';
          }
        
          if(data.email.trim() === ''){
            errors.email = 'Email is required';
          }
      
        case 'phone':
          if(!data?.phone.match(/^\+?[0-9]{7,}$/)){
            errors.phone= 'Phone is required and must be valid';
          }
        
          case 'password':
            if(data.password.length <5 ){
              errors.password = 'Password is required and must be greater than 5 characters';
            }
         
          case 'confirmPassword':
            if(data.password !== data.confirmPassword){
              errors.confirmPassword = 'Password is not matching';
            }
            break
          default:
            return null;
    }

   
    if(Object.keys(errors).length > 0){
      setErrors(errors)
  }else{
      setErrors({})
  }

  }



  // const payStackHandle =()=>{
  //   setIsLoading(true)

  //   if(email && amount){
  //     const payload = {
  //       email, amount
  //     }
  //     dispatch( payStackHandleAction(payload))
  //   }
  //   setIsLoading(false)

  // }


 


  console.log(auth, 'auth')
    
// if((!auth && !isLogin ) && !tokenFromStorage){


  return (
    <div className='form-div'>
      <h1 className='title'> Register with us</h1>
    <form onSubmit={handleSubmit} className='form'>
      <input type="text" placeholder="Firstname"  onChange={(event) => {setData({...data, firstname:event.target.value})}}   required />
      {errors.firstname? 
      <div className='errors'>{ errors.firstname}</div>
      :null
}
      <input type="text" placeholder="Lastname"  onChange={(event) =>{setData({...data, lastname:event.target.value})}}  required />
      {errors.lastname?
      <div className='errors'>  {errors.lastname}</div>
      :null}
      <input type="email" placeholder="Email"  onChange={(event) => {setData({...data, email:event.target.value})}}  required />
      {errors.email?
      <div className='errors'>  {errors.email}</div>
      :null}
      <input type="text" placeholder="Phone"  onChange={(event) =>{ setData({...data, phone:event.target.value})}}  required />
      {errors.phone?
      <div className='errors'>  {errors.phone}</div>
      :null}
      <input type="password" placeholder="Password"  onChange={(event) =>{ setData({...data, password:event.target.value})}}  required />
      {errors.password?
      <div className='color:red;'>  {errors.password}</div>
      :null}
      <input type="password" placeholder="ConfirmPassword"  onChange={(event) =>{setData({...data, confirmPassword:event.target.value})}}  required />
      {errors.confirmPassword?
      <div className='errors'>  {errors.confirmPassword}</div>
      :null}
      <button type="submit" className='button-checkout' disabled={()=>disableBtn()}> {!loading?'Register': 'Loading.....'}</button>
      <p className='errors-msg'> {error? error: null}</p>
    </form>

     <p className='signup' onClick={()=> navigate('/login')}> Are you already sign up? </p>

    </div>
  )

      // }else{
      //   return (
      //     <div className='form-div'>
      //       {
      //         !tokenFromStorage && !checkout?(

      //           <>
      //             <h1 className='title'> Please login with your details</h1>
      // <form onSubmit={handleLogin} className='form'>
      // <input type="email" placeholder="Email"  onChange={(event) => {setData({...data, email:event.target.value})}}  required />
      // {errors.email?
      //       <div className='errors'>  {errors.email}</div>
      //       :null}
      
      // <input type="password" placeholder="Password"  onChange={(event) =>{ setData({...data, password:event.target.value})}} required />
      //       {errors.password?
      //       <div className='errors'>  {errors.password}</div>
      //       :null}
      //         <p className='errors-msg'> {error? error: null}</p>
      // <button type="submit" className='button-checkout' disabled={()=>disableLogin()}>{!loading?'Login':'Loading....'}</button>
      // <p className='signup' onClick={()=> navigate('/password')}> Forgot password? </p>
      //   </form>

      
      //           </>
      //         )
      //         :

      //         <div className='checkout-wrapper'> 
      //              <button className='button-checkout' onClick={()=> payStackPopup()}> {!isLoading?"Make Payment":"Loading...."}</button>
                
      //             </div>

           

      //       }
    
     
      //     </div>
        // )
      // }

  
};

export default PaystackForm;