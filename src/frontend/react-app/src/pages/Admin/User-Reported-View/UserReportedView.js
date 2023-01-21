import "./UserReportedView.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useNavigate, useParams } from "react-router-dom";
import { UserContext, ThemeContext } from "../../../App";
import { useContext, useState } from "react";
import { privateAPI } from "../../../api";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';
import { Modal } from "react-responsive-modal";


const UserReportedView = () => {

  const [openModal, setOpenModal] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { reportedUsers } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = Cookies.get('token');
  let decodedToken = null;
  if (token) {
    decodedToken = jwt_decode(token);
  }

  const displayUser =  reportedUsers.find(report => report.user._id === id);


  function handleCloseReport() {

    const currReport = reportedUsers.find(report => report.user._id === id);

    const closeReport = async () => {
      const response = await privateAPI.patch('/report', {
        date: new Date().toISOString(),
        reportId: currReport._id,
        userId: decodedToken.sub,
        isOpen: false
      })

      if (response.status === 200) {
        setOpenModal(true);
        setErrMsg('Successfully Closed Report ');
      } else {
        setOpenModal(true);
        setErrMsg('Unable to close Report ');
      }
    }

    closeReport();

  }



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
            <h4 className="Medium-H4 ms-lg-4">Reported Users</h4>
          </div>
        </div>

        <div className="card-section mx-auto">
        <div className={`card flex-column align-items-center px-3 px-lg-5 border-0 ${isDark && "text-light bg-custom-black"}`} >
            
            {
              displayUser.user.profilePic ? 
              <img src={displayUser.user.profilePic} alt='Profile' className="profile-image-report-user-view" />
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
              <button className="btn-primary px-2 py-2 rounded text-light">View Reported Content</button>
              <button className="btn-primary  px-2 py-2 rounded text-light"
                onClick={() => navigate(`/profile?id=${displayUser.user._id}`)}
              >View User Profile</button>
              <button className="btn-primary px-2 py-2 rounded text-light"
                onClick={handleCloseReport}
              >Close Report</button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} center>
        <p className="SignIn-Error-Modal">{errMsg}</p>
      </Modal>
    </>
  )
}

export default UserReportedView;