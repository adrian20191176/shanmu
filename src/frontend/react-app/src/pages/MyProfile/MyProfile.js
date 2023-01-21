import "./MyProfile.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-modal/styles.css';
import Switch from "../../Components/toggleSwitch/toggleSwitch";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import UserImage from "../../asset/images/UserImage.svg";
import Tag from "../../Components/question/Tag";
import { publicAPI } from "../../api/publicAPI";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext, ThemeContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import CompareTime from "../../commonFunc/timeCalculator";
import { privateAPI } from "../../api";
import { Modal } from 'react-responsive-modal';
import jwt_decode from 'jwt-decode';
import Cookies from "js-cookie";
import Report from "../../Components/report/Report";

const MyProfile = () => {

  const [viewUser, setViewUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setIsError] = useState(false);
  const [reportSubmit, setReportSubmit] = useState(false);
  const [reportSubmitResponse, setReportSubmitResponse] = useState('');
  const [report, setReport] = useState({
    date: new Date().toISOString(),
  });


  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setupUser } = useContext(UserContext);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [reportOpen, setReportOpen] = useState(false);

  const userInQuery = searchParams.get('id');
  

  useEffect(() => {
    if (user) {
      if (userInQuery) {
        if (userInQuery === user.userId) {
          setViewUser(user);
          setIsOwner(true);
        } else {

          const token = Cookies.get('token');
          const decodedToken = jwt_decode(token)

          const getUser = async () => {
            const response = await privateAPI.get(`/user?id=${userInQuery}`);
            console.log('in getting view user ', response)
            if (response.status === 200) {
              setViewUser(response.data[0]);
            } else {
              setIsError(true);
            }
          }
          getUser();
          if (decodedToken.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } else {
        setViewUser(user);
        setIsOwner(true);
      }
    } else {
      const getUser = async () => {
        const response = await publicAPI.get(`/user?id=${userInQuery}`);
        if (response.status === 200) {
          setViewUser(response.data[0]);
        } else {
          setIsError(true);
        }
      }
      getUser();
    }
  }, [userInQuery])



  const logout = async () => {
    const response = await publicAPI.get('/token');

    if (response.status === 200) {
      navigate('/login');
      setupUser(null);
      setIsDark(false);
    } else {
    }
  }
    

  if (viewUser && !error) {
    const timeCalc = CompareTime(viewUser.dateJoined);
    return (
      <div className={`col-12 px-4 Medium-Body-sub-text-2 vh-100 Profile-Content ${isDark && "bg-custom-black text-light"}`}>
        <div className="Top-header">
          <div className="Content-header">
            <button type="button" className="btn btn-sm btn-link me-4 Back-btn"
              onClick={() => navigate(-1)}
            >
              <ArrowBackOutlinedIcon sx={isDark && 'color: #FFF'}/>
            </button>
            <h4 className="Medium-H4 ms-lg-4">Profile</h4>
          </div>
          <div className="Top-header-BtnGroup">
            <span id="theme-switch" className={isDark && 'text-light'}>
              <p>Light</p>
              <Switch />
              <p>Dark</p>
            </span>
            <button type="button" className="btn btn-primary btn-sm Top-LogOut-btn" onClick={logout}>Log&nbsp;Out</button>
          </div>
        </div>

        <div className="Profile-details">
          <div className="Image-section">
            {
              viewUser.profilePic ?
                <img src={viewUser.profilePic} alt='user-profile' className="img-fluid" />
                :
                <img src={UserImage} alt="UserImage" />
            }
          </div>

          <div className={`User-details ${isDark && "text-light"}`}>
            <h4 className="Regular-H4">{viewUser.username}</h4>
            <p className="Regular-Body-sub-text-2">Member for {timeCalc}</p>
            <div className="User-activities">
              <p>{viewUser.noOfQuestionAnswered} questions answered</p>
              {/*--below section is for desktop view only (to be hidden in mobile view)--*/}
              <section className="User-interests">
                {viewUser.categories && viewUser.categories.length > 0 && <p className="Regular-Tag-1">Interested in :</p>}
                <div>
                  {/* <Tag text={"category1"} /> */}
                  {viewUser.categories && viewUser.categories.map(category => (
                    <Tag text={category} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/*--below section is for mobile view only (to be hidden in desktop view)--*/}
        <section className="User-interests-mobile-view">
          {viewUser.categories && viewUser.categories.length > 0 && <p className="Regular-Tag-1">Interested in :</p>}
          <div>
            {/* <Tag text={"category1"} /> */}
            {viewUser.categories && viewUser.categories.map(category => (
              <Tag text={category} />
            ))}
          </div>
        </section>

        <p className="Regular-Body User-description">{viewUser.about}</p>

        {/*--change display:'block' to show and display:'none' to hide the below buttons--*/}
        <div className="ButtonGroup-bottom">
          {
            isAdmin ?
              <button style={{ display: 'block' }} type="button" className="btn btn-outline-primary btn-sm Edit-profile-btn"
                onClick={() => {
                  const userBlock = viewUser._id;
                  const reqSender = user.userId;
                  const blockUser = async () => {
                    const response = await privateAPI.patch('/user', {
                      userId: userBlock,
                      senderId: reqSender,
                      isBlocked: true
                    });
                    if (response.status === 200) {
                    } else {
                    }
                  }
                  blockUser();
                }}
              >
                Block User
              </button>
              :
              isOwner ?
                <button style={{ display: 'block' }} type="button" className={`btn btn-outline-primary btn-sm Edit-profile-btn ${isDark && "purple-bg text-light"}`}
                  onClick={() => navigate('/profile/edit')}
                >Edit Profile
                </button>
                :
                <button style={{ display: 'block' }} type="button" className="btn btn-outline-primary btn-sm Edit-profile-btn"
                  onClick={() => {
                    if (user) {
                      setReportOpen(true)
                    } else {
                      navigate('/login');
                    }
                  }}
                >Report User !
                </button>
          }
          <button type="button" className="btn btn-primary btn-sm LogOut-btn">Log Out</button> {/*--show to user--*/}
        </div>

        <button style={{ display: 'none' }} type="button" className="btn btn-outline-danger btn-sm Block-user-btn">Block User</button> {/*--show to admin--*/}
        <button style={{ display: 'none' }} type="button" className="btn btn-inline btn-sm Report-user-btn">Report User !</button> {/*--show to members--*/}
        

        <Report 
          isOpen={reportOpen} 
          handleClose={() => setReportOpen(false)}
          userId={userInQuery}
          reporterId={user?.userId}          
        />
      </div>
    )
  }

}

export default MyProfile;
