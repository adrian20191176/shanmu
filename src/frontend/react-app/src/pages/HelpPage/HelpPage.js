import "./HelpPage.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const HelpPage = () => {

  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`col-12 px-4 Medium-Body-sub-text-2 vh-100 ${isDark && "text-light bg-custom-black"} `}>
      <div className="Content-header">
        <button type="button" className={`btn btn-sm btn-link Back-btn me-4 ${isDark && "text-light"} `}
          onClick={() => navigate(-1)}
        >
          <ArrowBackOutlinedIcon />
        </button>
        <h4 className='Medium-H4 ms-lg-4'>Help</h4>
      </div>
      <div className="HelpBody">
        <div>
          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is SelfEd?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                SelfEd is a web based forum where students of multiple fileds can ask questions and post answers.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is voting?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Voting is the method of maintaining quality questions and answers. You can vote a question if it is important, so the content will rise at top. You can vote correct answers to help others to find the most relevant answer for their questions.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What are category tags?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Each question is categorized to a specific field of study and these fields contain main category tags and sub category tags under them. You can learn more on each tag by clicking on them.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>When to report users and content?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Content can be reported if it provides false,fake,misleading or improper information. Users can be reported related to hate speech, fake user profiles and improper content posting etc...
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is closing a question?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When a question receives a correct answer, the user who posted the question can close the question where others won't be able to answer the question anymore.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Will a single report block my account?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When a user/content is reported admin has the authority to block the user based on the report severity. A user will be blocked when the user account reaches a maximum of three reports.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>I can't find the required category tag to post the question. What can I do?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If a specific category tag is not available to post a question, you can use the most similar tag for the field.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={isDark && "bg-custom-black text-light border"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>How can I get more details or reach for help?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Email us your problems and concerns to SelfEd@gmail.com.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>

      </div>
    </div>
  )
}

export default HelpPage;
