import "./About.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const About = () => {

  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100 ${isDark && "bg-custom-black text-light"}`}>
      <div className="Content-header">
        <button type="button" className={`btn btn-sm btn-link Back-btn me-4 ${isDark && "text-light"}`}
          onClick={() => navigate(-1)}
        >
          <ArrowBackOutlinedIcon />
        </button>
        <h4 className="Medium-H4 ms-lg-4">About us</h4>
      </div>
      <div className="AboutContent">
        <h6>Who we are?</h6>
        <p>We are Stack Squad, a development project team of 4 members (Sumithu, Shanmugapriyan, Manisha, Gayathri).</p>
        <h6>What is SelfEd?</h6>
        <p>
        SelfEd is an Educational Platform. Here we will provide you with educational content for self learning purposes. You can interact with members and share knowledge through posting answers and questions. We provide you the best categorized content to focus and learn across multiple subject areas. We're working to turn your passion for Educational into an effective online web based forum. We hope you enjoy our service as much as we enjoy offering them to you.
        </p>
      </div>
    </div>
  )
}

export default About;
