import './AdminDashboard.scss';
import '../../../styles/variables.scss';
import Footer from '../../../Components/footer/footer';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { privateAPI } from '../../../api';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { UserContext, ThemeContext } from '../../../App';


const AdminDashboard = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  // const [reports, setReports] = useState([]);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { setReportedUsers, setCriticalUsers, setQuestionReports, setAnswerReports, setHistoryReports,

    reportedUsers, criticalUsers, questionReports, answerReports, historyReports
  } = useContext(UserContext);

  const token = Cookies.get('token');
  let decodedToken = null;

  if (token) {
    decodedToken = jwt_decode(token);
  }


  useEffect(() => {

    if (token) {
      if (decodedToken.role === 'admin') {


        const getReports = async () => {
          const response = await privateAPI.get('/report');
          // setReports(response.data);
          
          if (response.status === 200) {
            
            function splitReports() {
              const historyReports = response.data.filter(report => !report.isOpen);
              const newReports = response.data.filter(report => !historyReports.includes(report));

              const reportedUsers = newReports.filter(report => report.user);
              const criticalUsers = reportedUsers.filter(report => report.user.reportCount > 10);
              
              const questionReports = newReports.filter(report => report.question);
              const answerReports = newReports.filter(report => report.answer);
              
              setReportedUsers(reportedUsers);
              setCriticalUsers(criticalUsers);
              setQuestionReports(questionReports);
              setAnswerReports(answerReports);
              setHistoryReports(historyReports);

            }
  
            splitReports();
  
          }
          
  
        }
        
        getReports();
        setIsAdmin(true);
      }
    }
    
  }, [])


  return (
    <>
      {
        isAdmin ?
          <div className={`col-12 px-4 Medium-Body-sub-text-2 vh-100 ${isDark && "bg-custom-black text-light"}`}>
            <div className="Content-header">
              <h4 className='Medium-H4'>Admin Dashboard</h4>
              <span className='Switch-role'>
                <p className='Medium-Body'>Switch to:</p>
                <Link to='/profile'>
                  <button type="button" className="btn btn-outline-primary btn-sm User-Switch-Btn">User View</button>
                </Link>
              </span>
            </div>

            <div>
              <div className='Section-title'>
                <p className='Regular-Title'>Users</p>
              </div>

              <div className='Card-section'>
                {/*cards*/}
                <div className='ReportedUsers'
                  onClick={() => {
                    navigate('/admin-dashboard/reported-users')
                  }}
                >
                  <div><p className='Card-count'>{reportedUsers && reportedUsers.length}</p></div>
                  <div><p>View Reported Users</p></div>
                </div>
                <div className='ReportedUsers-critical'
                  onClick={() => 
                    navigate('/admin-dashboard/critical-users')
                  }
                >
                  <div className='card-tag'><WarningAmberIcon fontSize='small' /><p>Critical</p></div>
                  <div><p className='Card-count'>{criticalUsers && criticalUsers.length}</p></div>
                  <div><p>View Reported Users</p></div>
                </div>
              </div>
            </div>

            <div>
              <div className='Section-title'>
                <p className='Regular-Title'>Other</p>
              </div>

              <div className='Card-section mb-3'>
                {/*cards*/}
                <div className='ReportedQuestions'
                  onClick={() => navigate('/admin-dashboard/question-reports')}
                >
                  <div><p className='Card-count'>{questionReports && questionReports.length}</p></div>
                  <div><p>View Reported Questions</p></div>
                </div>
                <div className='ReportedAnswers'
                  onClick={() => navigate('/admin-dashboard/answer-reports')}
                >
                  <div><p className='Card-count'>{answerReports && answerReports.length}</p></div>
                  <div><p>View Reported Answers</p></div>
                </div>
                <div className='ReportedAnswers bg-info'
                  onClick={() => navigate('/admin-dashboard/history-reports')}
                >
                  <div><p className='Card-count'>{historyReports && historyReports.length}</p></div>
                  <div><p>Report History</p></div>
                </div>
              </div>
            </div>

          </div>
          :
          <div>You are not an admin</div>
      }
      <Footer />
    </>
  )
}

export default AdminDashboard;