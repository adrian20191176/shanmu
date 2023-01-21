import thumbUp from '../../asset/icons/thumb-up.svg';
import comment from '../../asset/icons/comment.svg';
import 'react-responsive-modal/styles.css';

import Tag from './Tag';
import Answer from '../answer/Answer';
import parse from 'html-react-parser';
import { UserContext, ThemeContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { privateAPI } from '../../api'
import { Modal } from 'react-responsive-modal';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Report from '../report/Report';

import "./question.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import CompareTime from '../../commonFunc/timeCalculator';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const Question = ({ props, isSpecific }) => {
  const [answer, setAnswer] = useState({});
  const [isSameUser, setIsSameUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState('');
  const [addVote, setAddVote] = useState(1);
  const [vote, setVote] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);

  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  console.log('question props ', props);

  useEffect(() => {

    const token = Cookies.get('token');
    
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken && decodedToken.role === 'admin') {
        setIsAdmin(true);
      } else if (user && user.userId === props.user?._id) {
        setIsSameUser(true);
      }
    }
  }, [isSpecific])

  const timeGap = CompareTime(props.date);
  //function to calculate time gap between current time and question asked time

  const navigate = useNavigate();
  const viewProfileURL = `/profile?id=${props.user && props.user._id}`;
  const specificQuestion = `/question?id=${props._id}`;


  function handleAnswerSubmit(e) {
    e.preventDefault();
    
    const postAnswer = async () => {
      const response = await privateAPI.post('/answer', answer);
      if (response.status === 201) {
        setIsOpen(true);
        setModalData('Successfully Posted Answer');
      } else {
        setIsOpen(true);
        setModalData('Something went wrong couldn\'t post answer');
      }
      setAnswer({ description: '' });
    }
    postAnswer();

  }

  function handleCloseQuestion() {

    const closeQuestion = async ()  => {
      const response = await privateAPI.patch('/question', {
        questionId: props._id,
        userId: user.userId,
        isOpen: false
      })
      if (response.status === 200) {
        setIsOpen(true);
        setModalData('Successfully closed question');
      } else {
        setIsOpen(true);
        setModalData('Error in closing question');
      }
    }
    closeQuestion();
  }


  function handleDeleteQuestion() {

    const delQuestion = async () => {
      const response = await privateAPI.delete(`/question?qid=${props._id}&uid=${user.userId}`);
      if (response.status === 200) {
        setIsOpen(true);
        setModalData('Successfully deleted question');
      } else {
        setIsOpen(true);
        setModalData('Error is deleting question');
      }
    }
    delQuestion();
  }


  function handleVote() {

    if (addVote === 1) {
      setAddVote(2);
    } else {
      setAddVote(1);
    }
    
    const voting = async () => {
      const response = await privateAPI.patch('/question', {
        questionId: props._id,
        userId: user.userId,
        vote: addVote
      })
      if (response.status = 200) {
        if (vote === 0) {
          setVote(vote + 1);
        } else if (vote === 1) {
          setVote(vote - 1);
        }
      }
    }
    return voting();
  }

  
  return (
    <div className={`col-12 px-2 Medium-Body-sub-text-2 Question-component ${isDark && "bg-custom-black text-light"}`}>
     {
      isSpecific ? 
      <>
        <h1 className="py-4 Medium-SubTitle">{props.title}</h1>
        <p className="py-2">
          {parse(props.description)}
        </p>
        { props.img && <img src={props.img} className="img-fluid" alt='question' /> }
      </>
     :
     <Link to={specificQuestion} className={`text-decoration-none text-body ${isDark && "link-light"}`}>
     <h1 className={`py-4 Medium-SubTitle ${isDark && "link-light"}`}>{props.title}</h1>
      <p className={`py-2 ${isDark && "link-light"}`}>
        {/* {props.description} */}
        {parse(props.description)}
      </p>
      {props.img && <img src={props.img} className="img-fluid" alt='question' />}
      {/* style={isDark && { border: "solid 2px #FFF", borderRadius: 10 }} */}
     </Link>
     }

        <div className='text-end px-3'>
          { !props?.isOpen && 
          <span>
            <Tag text='Closed Question' color='#ebb434' />
          </span>
         }
          <span
          className='px-3'
            onClick={() => setReportOpen(true)}
          >
            Report !
          </span>
        </div>
      <div className='d-flex justify-content-between'>
        <div>
          {props.tags && props.tags.map(tag => (<Tag key={tag} text={tag} />))}
        </div>
        { 
          user && isAdmin && 
          <div>
            { props.isOpen && <button className={`btn ${isDark && "text-light"}`} onClick={handleCloseQuestion}> <HighlightOffIcon fontSize='small'/>Close Question</button> }
            <button className={`btn ${isDark && "text-light"} delete-question`} onClick={handleDeleteQuestion}>Delete</button>
          </div>
        }
        { 
          user && isSameUser && 
          <>
            <button className={`btn ${isDark && "text-light"}`} onClick={handleCloseQuestion}>Close Question</button>
          </>
        }

      </div>
      <div className="d-flex justify-content-between flex-column flex-lg-row">
        <div>
          <button className={`btn btn-transparent me-2 ${isDark && "bg-dark text-light border"}`}>
            <img src={comment} alt="comment" className={isDark && "img-dark-mode"} />
            <span className="align-self-center px-2 Medium-Body-sub-text-2">{props.answers && props.answers.length} Answers</span>
          </button>
          <button className={`btn btn-transparent ${isDark && "bg-dark text-light border"}`}
            onClick={() => {
              if (Object.keys(user).length === 0) {
                return navigate('/login');
              } else {
                handleVote();
              }
            }}
          >
            <img src={thumbUp} alt="thumbup" className={isDark && "img-dark-mode"} />
            <span className="align-self-center px-2 Medium-Body-sub-text-2">{props.votes + vote} Votes</span>
          </button>
        </div>
        <div className="d-flex flex-row py-3">
          <Link to={viewProfileURL} className={`text-decoration-none px-2 ${isDark && "link-warning"} `}>{props.user && props.user.username}</Link>
          <p className="px-2 px-lg-0">asked {timeGap} ago</p>
        </div>
      </div>

      {
        user && props?.isOpen &&
              <form onSubmit={(e) => handleAnswerSubmit(e)}>
                <textarea type="text" className="form-control mb-3 answer-input" id="answer-input" placeholder='Add your answer'
                  value={answer.description}
                  onChange={(e) => setAnswer({
                    date: new Date().toISOString(),
                    userId: user.userId,
                    questionId: props._id,
                    description: e.target.value
                  })}
                >
                </textarea>
                <button type='submit' className={`btn border mb-4 post-answer-btn ${isDark && "purple-bg text-light"}`}>Post Answer</button>
            </form>
      }

      <div className='ms-md-5 Answers'>
        {props.answers?.length > 0 &&
          (
            <>
              <p className='Regular-SubTitle fw-bold' >{props.answers.length} Answers</p>
              {props.answers.map((answer, index) => {
                if (isSpecific) {
                  return (
                    <Answer key={answer._id} answer={answer} questionId={props._id} qisOpen={props.isOpen} isSpecific={isSpecific} />
                  )
                } else if (index < 2){
                  return (
                    <Answer key={answer._id} answer={answer} qisOpen={props.isOpen} questionId={props._id} />
                  ) 
                }
              })}
            </>
          )
        }
        {/* <a href="#" className="text-decoration-none px-2 Link-Dark Add-Answer">Add Answer</a> */}
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} center>
        <h2 className='modal-custom'>{modalData && modalData}</h2>
      </Modal>

      <Report 
        isOpen={reportOpen} 
        handleClose={() => setReportOpen(false)}
        userId={props.user?._id}
        reporterId={user?.userId}
        questionId={props._id}
      />
    </div>
  )
}

export default Question;