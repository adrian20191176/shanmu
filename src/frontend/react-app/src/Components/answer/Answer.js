import "./answer.scss";
import './answer.css';
import 'react-responsive-modal/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { UserContext, ThemeContext } from '../../App';
import { useState, useContext } from 'react';
import { privateAPI } from '../../api'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Report from "../report/Report";


const Answer = ({ answer, questionId, isSpecific, qisOpen }) => {

  const [comment, setComment] = useState({});
  const [isPostComment, setIsPostComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState('');
  const [reportOpen, setReportOpen] = useState(false);
  const [commentReportOpen, setCommentReportOpen] = useState(false);
  const [addVote, setAddVote] = useState(1);
  const [vote, setVote] = useState(0);

  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);

  const navigate = useNavigate();

  
  function handleCommentSubmit(e) {
    e.preventDefault();
    
    const postComment = async () => {
      const response = await privateAPI.post('/comment', comment);
      setIsPostComment(false);
      if (response.status === 201) {
        setIsOpen(true);
        setModalData('Successfully posted comment');
      } else {
        setIsOpen(true);
        setModalData('Something went wrong');
      }
      setComment({ description: '' });
    }
    postComment();

  }

  
  function handleVote() {

    if (addVote === 1) {
      setAddVote(2);
    } else {
      setAddVote(1);
    }
    
    const voting = async () => {
      const response = await privateAPI.patch('/answer', {
        answerId: answer._id,
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
    <div className={`col-12 ps-2 Medium-Body-sub-text-2 pl-2 border-bottom-1 my-2 py-lg-4 p-2 Answer-Body rounded  ${isDark && "bg-dark text-light"}`}>

      <p>
        {answer.description}
      </p>


      <div className="d-flex justify-content-between justify-content-lg-start flex-column flex-lg-row my-2">
        <div className='me-auto'>
          <button className={`btn btn-sm btn-transparent ${isDark && "text-light"} `}
            onClick={() => setShowComment(!showComment)}
          >
            <ChatBubbleOutlineOutlinedIcon fontSize='small' />
            <span className="align-self-center px-2 Medium-Body-sub-text-2">{answer.comments?.length} Comments</span>
          </button>
          <button className={`btn btn-sm btn-transparent ${isDark && "text-light"} `}
              onClick={() => {
                if (Object.keys(user).length === 0) {
                  return navigate('/login');
                } else {
                  handleVote();
                }
              }}
          >
            <ThumbUpOutlinedIcon fontSize='small' />
            <span className="align-self-center px-2 Medium-Body-sub-text-2">{answer.votes ? answer.votes + vote : vote } Votes</span>
          </button>
        </div>
        <div className="d-flex flex-row py-3">
          <a href="#" className={`text-decoration-none px-2 d-flex justify-content-end ${isDark && "link-warning"}`}
            onClick={() => {
              navigate(`/profile?id=${answer.user._id}`)
            }}
          >{answer.user && answer.user.username}</a>
          <a href="#" className={`text-decoration-none px-2 Report-Btn ${isDark && "link-light"}`}
            onClick={() => setReportOpen(true)}
          >
            Report !
          </a>
        </div>
      </div>

      <div className="comment-view-container pt-3">
        {answer.comments?.length > 0 &&
   
              showComment && answer.comments.map((comment, index) => {
              if (isSpecific) {
                return (
                  <div className="bg-white py-2 px-2 d-flex flex-column border-bottom"  key={comment._id}>
                      <div>
                        {comment.description && comment.description}
                      </div>
                      <div className="py-2">
                        <a href="#" className="float-start text-decoration-none"
                            onClick={() => {
                              navigate(`/profile?id=${answer.user._id}`)
                            }}
                        > {comment.user && comment.user.username} </a>
                        <span className="float-end">Report</span>
                      </div>
                  </div>
                )
              } else if (index < 2) {
                return (
                 <div className={`py-2 px-2 d-flex flex-column border-bottom ${isDark ? "bg-dark" : "bg-white"}`}  key={comment._id}>
                     <div>
                       {comment.description && comment.description}
                     </div>
                     <div className="py-2">
                       <a href="#" className={`float-start text-decoration-none ${isDark && "link-warning"}`}
                           onClick={() => {
                            navigate(`/profile?id=${comment.user._id}`)
                          }}
                       > {comment.user && comment.user.username} </a>
                       <span className="float-end"
                        onClick={() => setCommentReportOpen(true)}
                       >Report</span>
                     </div>
                     <Report 
                        isOpen={commentReportOpen} 
                        handleClose={() => setCommentReportOpen(false)}
                        userId={answer.user._id}
                        reporterId={user.userId}
                        questionId={questionId}
                        answerId={answer._id}
                        commentId={comment._id}
                     />
                 </div>
               )
             }
            })}
      </div>

      <div className="mt-4">
        <button className={`btn text-decoration-none Link-Dark ${isDark && "text-light"} `}
          onClick={() => {
            if (user) {
              setIsPostComment(!isPostComment);
            } else {
              navigate('/login')
            }
          }}
        >
          { !isPostComment && qisOpen ? 'Add Comment' : isPostComment ? 'Cancel' : '' }
        </button>
      </div>

      {
        isPostComment &&
              <form onSubmit={(e) => handleCommentSubmit(e)}>
                <textarea type="text" className="form-control mb-3 answer-input" id="comment-input" placeholder='Add your comment'
                  onChange={(e) => setComment({
                    date: new Date().toISOString(),
                    userId: user.userId,
                    questionId: questionId,
                    description: e.target.value,
                    answerId: answer._id
                  })}
                >
                </textarea>
                <button type='submit' className='btn border mb-4 post-answer-btn'>Post Comment</button>
            </form>
      }

      <Modal open={isOpen} onClose={() => setIsOpen(false)} center>
        <p className="Error-Modal">{modalData && modalData}</p>
      </Modal>

      <Report 
        isOpen={reportOpen} 
        handleClose={() => setReportOpen(false)}
        userId={answer.user?._id}
        reporterId={user?.userId}
        questionId={questionId}
        answerId={answer._id}
      />
    </div>
  )
}

export default Answer;
