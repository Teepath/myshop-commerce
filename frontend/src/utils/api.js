import Cookies from "js-cookie";
import { api } from "./axiosIstance"; 


// Add a request interceptor to include the token
// api.interceptors.request.use(
//   (config) => {
//     const token = getTokenFromCookie();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;


export const configureAxiosHeaders =async(token)=>{
  try {
    // Set token in headers
    if(token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token?token:localStorage.getItem('token')}`;
    }
  } catch (error) {
    console.error(error);
  }
}


