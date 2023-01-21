import "./AskQuestion.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PostQuestion from "../../Components/ask_question/PostQuestion";


const AskQuestion = () => {

  const { isDark } = useContext(ThemeContext); 
  const navigate = useNavigate();

    return (
        <div className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100 ${isDark && "bg-dark text-light"}`}>
            <div className="Content-header">
                <button type="button" className="btn btn-sm btn-link Back-btn me-4"
                  onClick={() => navigate(-1)}
                >
                    <ArrowBackOutlinedIcon sx={isDark && 'color: #FFF'} />
                </button>
                <h4 className="Medium-H4 ms-lg-4">Ask Question</h4>
            </div>
            <div className="px-lg-2 py-lg-4">
                <PostQuestion />
            </div>
        </div>
    )
}

export default AskQuestion;
