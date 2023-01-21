import "./SignUp.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import signupImg from "../../asset/images/signUp.svg"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { publicAPI } from "../../api";

const SignUp = () => {

  const [userDetails, setUserDetails] = useState({});
  const [passwordCopy, setPasswordCopy] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordCopy === userDetails.password) {
      const postData = async () => {
        const response = await publicAPI.post('/signup', userDetails);
        if (response.status === 201) {
          navigate('/login');
        } else {
        }
      }
      postData();
    } else {
    }
  }

  return (
    <div className="col-12 px-4 Medium-Body-sub-text-2 mb-lg-4">
      <div className="Content-header">
        <button type="button" className="btn btn-sm btn-link Back-btn me-4"
          onClick={() => navigate(-1)}
        >
          <ArrowBackOutlinedIcon />
        </button>
        <h4 className="Medium-H4 ms-lg-4">Sign Up</h4>
      </div>

      <div className="container px-auto col-6">
        <form className="SignUpForm" onSubmit={handleSubmit}>
          <img src={signupImg} alt="Sign up Image" className="SignUpImage mb-4" />
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              onChange={(e) => setUserDetails({
                ...userDetails,
                fullName: e.target.value
              })}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter User Name"
              onChange={(e) => setUserDetails({
                ...userDetails,
                username: e.target.value
              })}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setUserDetails({
                ...userDetails,
                email: e.target.value
              })}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setUserDetails({
                ...userDetails,
                password: e.target.value,
                dateJoined: new Date().toISOString()
              })}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              onChange={(e) => setPasswordCopy(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex gap-4">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label mx-2" htmlFor="customCheck1">
                I agree to<Link to="#"> terms and conditions</Link>
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-2 mt-4 px-4">
              Sign Up
            </button>
          </div>

          <div className="d-flex">
            <p className='me-1'>Have an account?</p>
            <Link to="/login"> Login</Link>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SignUp;
