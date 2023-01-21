import axios from 'axios';

const RequestHandler = axios.create({
  baseURL: process.env.REACT_APP_API,
  credentials: 'same-origin',
  withCredentials: true
});

export default RequestHandler;