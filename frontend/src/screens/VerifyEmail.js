import './AuthScreen.css'
import React, { useEffect, useState} from 'react';
import {useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



const VerifyToken = () => {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading)
    const dispatch =useDispatch()
    const [errors, setErrors] = useState({})
    const [token, setToken] = useState("")


  


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
      <input type="text" placeholder="Enter Token"  onChange={(event) => {setToken(event.target.value)}}  required />
      {/* {errors.email?
            <div className='errors'>  {errors.email}</div>
            :null} */}

             <button type="submit" disabled={loading} onClick={handleLogin}>Submit</button>
             {error && <div className='errors'>{error}</div>}
             {loading && <div>Loading...</div>}

    
        </form>
        <p className='signup' onClick={()=> navigate('/reverify')}> You don't receive token? </p>
      
                </>
         
    
     
          </div>
        )
      

  
};

export default VerifyToken;