import axios from "axios";


// export function getTokenFromCookie(token) {
//   return token;
// }

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`, // Your API base URL
});