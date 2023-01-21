import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import LandingPage from '../src/pages/LandingPage/LandingPage.js';
import Navbar from './Components/navbar/Navbar.js';
import About from './pages/AboutUs/About.js';
import AskQuestion from './pages/AskQuestion/AskQuestion.js';
import Login from './pages/Login/Login.js';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.js';
import SignUp from './pages/SignUp/SignUp.js';
import MyProfile from './pages/MyProfile/MyProfile.js';
import AdminDashboard from './pages/Admin/Admin-Dashboard/AdminDashboard.js';
import EditProfile from './pages/EditProfile/EditProfile.js';
import ViewQuestion from './pages/ViewQuestion/ViewQuestion.js';
import UserReported from './pages/Admin/User-Reported/UserReported.js';
import UserReportedView from './pages/Admin/User-Reported-View/UserReportedView.js';
import CriticalReported from './pages/Admin/Critical-Reported/CriticalReported.js';
import QuestionReport from './pages/Admin/Question-Report/QuestionReport.js';
import QuestionReportedView from './pages/Admin/Question-Reported-View/QuestionReportedView.js';
import AnswerReport from './pages/Admin/Answer-Report/AnswerReport.js';
import AnswerReportedView from './pages/Admin/Answer-Reported-View/AnswerReportedView.js';
import PageNotFound from './pages/Page-not-found/PageNotFound.js';
import HistoryReport from './pages/Admin/History-Report/HistoryReport.js';
import HistoryReportedView from './pages/Admin/History-Report-View/HistoryReportView.js';
import CategoryView from './pages/CategoryView/CategoryView.js';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.js';
import HelpPage from './pages/HelpPage/HelpPage.js';



export const UserContext = createContext(null);
export const ThemeContext = createContext(false);

function App() {

  const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem('user')));

  const [reportedUsers, setReportedUsers] = useState([]);
  const [criticalUsers, setCriticalUsers] = useState([]);
  const [questionReports, setQuestionReports] = useState([]);
  const [answerReports, setAnswerReports] = useState([]);
  const [historyReports, setHistoryReports] = useState([]);

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const setupUser = (user) => {
    window.sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <UserContext.Provider
        value={{ user, setupUser, reportedUsers, criticalUsers, questionReports, historyReports,
          answerReports, setReportedUsers, setCriticalUsers, setQuestionReports, setAnswerReports, setHistoryReports }}
      >

        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <Router>
            <Navbar setQuery={setQuery} />
            <Routes>
              <Route path="/" element={<LandingPage items={items} setItems={setItems} query={query} />} />
              <Route path="/question" element={<ViewQuestion />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:type" element={<CategoryView />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/ask-question" element={<AskQuestion />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path='admin-dashboard/reported-users' element={<UserReported />} />
              <Route path='admin-dashboard/reported-users/:id' element={<UserReportedView />} />
              <Route path='admin-dashboard/critical-users' element={<CriticalReported />} />
              <Route path='admin-dashboard/question-reports' element={<QuestionReport />} />
              <Route path='admin-dashboard/question-reports/:id/:qid' element={<QuestionReportedView />} />
              <Route path='admin-dashboard/answer-reports' element={<AnswerReport />} />
              <Route path='admin-dashboard/answer-reports/:id/:qid/:aid' element={<AnswerReportedView />} />
              <Route path='admin-dashboard/history-reports' element={<HistoryReport />} />
              <Route path='admin-dashboard/history-reports/:id/:qid/:aid' element={<HistoryReportedView />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
