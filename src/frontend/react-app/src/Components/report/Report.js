import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { privateAPI } from '../../api';
import { useState } from 'react';
import './Report.scss';

const Report = ({ reporterId, userId, questionId, answerId, commentId, isOpen, handleClose }) => {

  const [reportSubmit, setReportSubmit] = useState(false);
  const [reportSubmitResponse, setReportSubmitResponse] = useState('');
  const [report, setReport] = useState({
    date: new Date().toISOString(),
    reporterId: reporterId,
    userId: userId,
    questionId: questionId,
    answerId: answerId,
    commentId: commentId
  });


  const reportOptions = [
    {
      value: 'incorrect-answer-comment',
      option: 'Incorrect answer/comment'
    },
    {
      value: 'fake-user',
      option: 'Fake User'
    },
    {
      value: 'inappropriate-content',
      option: 'Inappropriate content'
    },
    {
      value: 'hate-speech-or-harrassment',
      option: 'Hate speech or harrassment'
    },
    {
      value: 'spam',
      option: 'Spam'
    },
    {
      value: 'other',
      option: 'Other (describe in description)'
    }
  ];

  function handleReportSubmit(e) {
    e.preventDefault();
    console.log('just before submit ', report)
    const postReport = async () => {
      const response = await privateAPI.post('/report', report);
      if (response.status === 201) {
        handleClose();
        setReportSubmit(true);
        setReportSubmitResponse('successfully reported the user');
      } else {
        setReportSubmit(true);
        setReportSubmitResponse('error in reporting the user');
      }
    }
    postReport();
  }


  return (
    <>
      <Modal open={isOpen} onClose={handleClose} center>
        <h5>Report</h5>
        <form className="my-3 mx-4" onSubmit={e => handleReportSubmit(e)}>
          <div className='ReportReason'>
            <label htmlFor="report-type" className="form-label">Reason to Report : </label>
            <select className="form-select" id='report-type' aria-label="Default select example" defaultValue={'incorrect-answer-comment'}
              onChange={(e) => setReport({
                ...report,
                type: e.target.value,
              })}
            >
              {reportOptions.map(option => (
                <option value={option.value}>{option.option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="report-info" className="form-label">Description</label>
            <textarea type="text" className="form-control mb-3 answer-input" id="report-info" placeholder='describe your reason to report'
              onChange={(e) => setReport({
                ...report,
                description: e.target.value
              })}
            >
            </textarea>
          </div>
          <button type='submit' className="btn border Submit">Submit</button>
        </form>
      </Modal>

      <Modal open={reportSubmit} onClose={() => setReportSubmit(false)} center>
        <p className='ErrorModal'>{reportSubmitResponse}</p>
      </Modal>
    </>
  )
}

export default Report