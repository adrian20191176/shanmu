import "./HistoryReportView.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNavigate, useParams } from "react-router-dom";
import { UserContext, ThemeContext } from "../../../App";
import { useContext } from "react";
import { privateAPI } from "../../../api";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';

const HistoryReportedView = () => {

  const { reportedUsers, questionReports, answerReports } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id, qid, aid } = useParams();

  const token = Cookies.get('token');
  let decodedToken = null;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const displayUser =  reportedUsers.find(report => report.user._id === id);
  const displayQuestion = questionReports.find(report => report.question._id === qid);
  const displayAnswer = answerReports.find(report => report.answer._id == aid);



  return (
    <>
      <div className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100 ${isDark && "bg-custom-black text-light"}`}>
        <div className="Top-header">
          <div className="Content-header">
            <button type="button" className={`btn btn-sm btn-link me-4 Back-btn ${isDark && "text-light"}`}
              onClick={() => navigate(-1)}
            >
              <ArrowBackOutlinedIcon />
            </button>
            <h4 className="Medium-H4 ms-lg-4">Report History</h4>
          </div>
        </div>

        <div className="card-section mx-auto">
        <div className={`card flex-column align-items-center px-3 px-lg-5 border-0  ${isDark && "bg-custom-black text-light"}`} >
            
            {
              displayUser.user?.profilePic ? 
              <img src={displayUser.user?.profilePic} alt='Profile' className="profile-image-report-user-view" />
              :
              <img src={require('../../../asset/images/Profile-Image.png')} alt='Profile' className="profile-image-report-user-view" />
            }
            <div className="card-body lh-lg">
              <h5 className="card-title text-center">{ displayUser.user.username }</h5>
              <p className="card-text fw-bold">
                Reported For - { displayUser.type }
              </p>
              <p className="card-text">
                { displayUser.description }
              </p>
            </div>
            <div className="d-flex gap-4">
              <button className="btn-primary px-2 py-2 rounded text-light"
                onClick={() => navigate(`/question?id=${displayQuestion.question._id}`)}
              >View Reported Content</button>
              <button className="btn-primary  px-2 py-2 rounded text-light"
                onClick={() => navigate(`/profile?id=${displayUser.user._id}`)}
              >View User Profile</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryReportedView;