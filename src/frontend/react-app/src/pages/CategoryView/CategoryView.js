import "./CategoryView.scss";
import { useParams, useNavigate } from 'react-router-dom';
import { subcategory } from "../../commonFunc/categoryOptions";
import { ThemeContext } from "../../App";
import { useContext } from "react";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Tag from "../../Components/question/Tag";

const CategoryView = () => {

  const { type } = useParams();
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const info = subcategory.find(cat => cat.type === type);



    return (
      <div className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100 ${isDark && "bg-custom-black text-light"}`}>
        <div className="Content-header">
          <button type="button" className={`btn btn-sm btn-link Back-btn me-4 ${isDark && "text-light"}`}
            onClick={() => navigate(-1)}
          >
            <ArrowBackOutlinedIcon />
          </button>
          <h4 className="Medium-H4 ms-lg-4">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        </div>
  
        <div className="CategoryContent">
          <p className="Description">{info?.description}</p>
          <p>This consists of the following sub areas,</p>
          <div className="SubCategories">
            {info[type].map(sub => (
              <Tag text={sub.value}></Tag>
            ))}
          </div>
          <button className="btn btn-primary btn-sm"
            onClick={() => navigate(`/`)}
          >
            View Questions
          </button>
        </div>
      </div>
    )
  }
  
  export default CategoryView;