import "./Login.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginImg from "../../asset/images/Login.svg";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import 'react-responsive-modal/styles.css';

import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { publicAPI } from '../../api/publicAPI';
import { Modal } from "react-responsive-modal";


const Login = () => {
  const [data, setData] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { setupUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const postForm = async () => {
      const response = await publicAPI.post('/token', {
        ...data
      });
     
      if (response.status === 200) {
        setupUser(response.data);
        navigate('/');
      } else if (response.response && response.response.status === 403) {
        console.log('user is blocked');
        setOpenModal(true);
        setErrMsg('You are blocked !')
      } else if (response.response && response.response.status === 401)  {
        console.log('user tried invalid password');
        setOpenModal(true);
        setErrMsg('Invalid Username or Password !')
      } else {
        console.log('some errror in logging in');
        setOpenModal(true);
        setErrMsg('Error in logging in')
      }
    } 
    postForm();
  }
  

  return (
    <div className="col-12 px-4 mb-lg-4 container-fluid">
      <div className="Content-header">
        <button type="button" classname="btn btn-sm btn-link Back-btn me-4"
        onClick={() => {
          navigate(-1);
        }}>
          <ArrowBackOutlinedIcon />
        </button>
        <h4 className="Medium-H4 ms-lg-4">Login</h4>
      </div>
      <div className="container px-auto col-6">
        <form className="LoginForm" onSubmit={handleSubmit}>
          <img src={LoginImg} alt="Login Image" className="LoginImage mb-4"/>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              onChange={(e) => setData({
                ...data,
                username: e.target.value
              })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setData({
                ...data,
                password: e.target.value
              })}
            />
          </div>
          <div className="mb-3 d-flex gap-4 secondary-input">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label mx-1" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
            <div>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-2 mt-4 px-4">
              Sign In
            </button>
          </div>
          <div className="d-flex">
            <p className='me-1'>Don't have an account?</p>
            <Link to="/signup">Register</Link>
          </div>
        </form>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} center>
        <p className="SignIn-Error-Modal">{errMsg}</p>
      </Modal>
    </div>
  )
}

export default Login;
