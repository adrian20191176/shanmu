import "./AnswerReport.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNavigate } from "react-router-dom";
import { UserContext, ThemeContext } from "../../../App";
import { useContext } from "react";



const AnswerReport = () => {

  const { answerReports } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();


  return (
    <>
      <div className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100  ${isDark && "bg-custom-black text-light"}`}>
        <div className="Top-header">
          <div className="Content-header">
            <button type="button" className={`btn btn-sm btn-link me-4 Back-btn  ${isDark && "text-light"}`}
              onClick={() => navigate(-1)}
            >
              <ArrowBackOutlinedIcon />
            </button>
            <h4 className="Medium-H4 ms-lg-4">Reported Answers</h4>
          </div>
        </div>

        <div className="card-section">
         {
          answerReports.map(report => (
            <div className={`card flex-row align-items-center px-3 px-lg-5 border-0 ${isDark && "bg-custom-black text-light"}`} key={report._id}
              onClick={() => navigate(`/admin-dashboard/answer-reports/${report.user._id}/${report.question._id}/${report.answer._id}`)}
            >
            {
              report.user.profilePic ? 
              <img src={report.user.profilePic} alt='Profile' className="profile-image me-5" />
              :
              <img src={require('../../../asset/images/Profile-Image.png')} alt='Profile' className="profile-image me-5" />
            }
            <div className="card-body">
              <h5 className="card-title">{ report.user.username }</h5>
              <p className="card-text">
                Reported For - { report.type }
              </p>
            </div>
          </div>
          ))
         }
        </div>
      </div>
    </>
  )
}

export default AnswerReport;