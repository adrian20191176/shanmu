import "./PageNotFound.scss";
import { Link } from 'react-router-dom';
import PageNotFoundImage from "../../asset/images/PageNotFound.svg";

const PageNotFound = () => {
    return (
      <div className="col-12 px-4 Medium-Body-sub-text-2 mb-lg-4">
        <img src={PageNotFoundImage} alt="404" className="ErrorImage"/>
        <p className="ErrorMessage">Page Not Found</p>
        <p className="ErrorDescription">Try searching another page or visit our 
            <Link to="/help" className="help-link px-1"> help section.</Link>
        </p>
      </div>
    )
  }
  
  export default PageNotFound;