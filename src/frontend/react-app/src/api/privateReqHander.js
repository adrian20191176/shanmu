import Cookies from 'js-cookie';
import axios from 'axios';

const tokenCookie = Cookies.get('token');

const PrivateReqHandler = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${tokenCookie}`,
  },
});

export default PrivateReqHandler;