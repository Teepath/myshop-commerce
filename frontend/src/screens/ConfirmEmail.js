import './AuthScreen.css'
import React, { useEffect, useState} from 'react';
import {useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



const ConfirmEmail = () => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading)
    const dispatch =useDispatch()
    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState("")


  


  const handleLogin = async (event)=>{
    event.preventDefault()
  

  

    
    //   dispatch(loginUserHandle(payload, navigate))

}








    

        return (
          <div className='form-div'>
            {/* {
              !tokenFromStorage && !checkout?( */}

                <>
                  <h1 className='title'> Please Verify Email</h1>
      <form  className='form'>
      <input type="email" placeholder="Enter Token"  onChange={(event) => {setEmail(event.target.value)}}  required />
      {/* {errors.email?
            <div className='errors'>  {errors.email}</div>
            :null} */}
    
        </form>
        <p className='signup' onClick={()=> navigate('/signin')}> You don't have account? </p>
      
                </>
         
    
     
          </div>
        )
      

  
};

export default ConfirmEmail;