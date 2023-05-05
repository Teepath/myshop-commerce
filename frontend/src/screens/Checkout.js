import React,{useState, useEffect} from 'react'
import axios from 'axios';

function Checkout() {

  const [isLoading, setIsLoading] = useState(false)
  const [tokenFromStorage, setTokenFromStorage] = useState('')
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState()

  useEffect(()=>{
    let amount = JSON.parse(localStorage.getItem('amount'))
    setAmount(amount);

    let data = JSON.parse(localStorage.getItem('data'))

    let email = data?.user.email;

    setEmail(email);

    let token = data?.token;

    setTokenFromStorage(token)

  }, [])

  const payStackPopup =async ()=>{
    setIsLoading(true)
    try{
  
  
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
  return (
    <div className='checkout-wrapper'> 
                   <button className='button-checkout' onClick={()=> payStackPopup()}> {!isLoading?"Make Payment":"Loading...."}</button>
                
                  </div>
  )
}

export default Checkout
