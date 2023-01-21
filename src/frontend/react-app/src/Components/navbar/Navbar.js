import { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext, ThemeContext } from '../../App';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../navbar/navbar.scss';
import '../../styles/overrides.css';
import '../../styles/variables.css';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Navbar = ({ setQuery }) => {

  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  let userObjLength = 0;
  if (user) {
     userObjLength = Object.keys(user).length;
  }

  const tokenCookie = Cookies.get('token');
  let decodedToken = null;
  if (tokenCookie) {
    decodedToken = jwt_decode(tokenCookie);
  }

  return (
    <div className='Navigation'>

      <nav className={`navbar navbar-expand-lg navbar-light border-bottom ${isDark && "text-light bg-dark"}`}>
        <div className="container-fluid">
          <Link className="navbar-brand pb-lg-0 pe-5 ps-3 mr-5" to="/"> <h4><span style={isDark ? { color: '#FFF'} : {color: '#292929'} }>Self</span>Ed</h4></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <MenuOutlinedIcon></MenuOutlinedIcon>
          </button>
          <div className="collapse navbar-collapse justify-content-between top-border pt-4 pt-lg-0" id="navbarSupportedContent">
            <div>
              <form className="d-flex ps-lg-5">
                <input className="form-control me-2 input-search" type="search" placeholder="Search your question" aria-label="Search" 
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button id="search-button" type="button" className="btn btn-primary">
                  <SearchOutlinedIcon></SearchOutlinedIcon>
                </button>

              </form>
            </div>
            <div className="px-3 Link-List">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 Regular-Body">
                <li className="nav-item ProfileImage-LargeScreens" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                  onClick={() => navigate('/profile')}
                >
                  <Link to="/profile">
                    {/*--hidden in large screens--*/}
                    <img src={require('../../asset/images/Profile-Image.png')} alt='Profile'></img>
                  </Link>
                </li>
                <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                                    onClick={() => navigate('/')}

                >
                  <Link to="/" className={`nav-link px-3 ${isDark && "link-light"}`}>Home</Link>
                </li>
                <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                                    onClick={() => navigate('/categories')}

                >
                  <Link to="/categories" className={`nav-link px-3 ${isDark && "link-light"}`}>Categories</Link>
                </li>
                <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                
                onClick={() => navigate('/help')}
                >
                  <Link to="/help" className={`nav-link px-3 ${isDark && "link-light"}`}>Help</Link>
                </li>
                {
                  userObjLength < 1 &&
                  <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                  onClick={() => navigate('/login')}

                  >
                    <Link to="/login" className={`nav-link px-3 ${isDark && "link-light"}`}>Login</Link>
                  </li>
                }
                {
                  userObjLength < 1 &&
                  <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                  onClick={() => navigate('/signup')}

                  >
                    <Link to="/signup" className={`nav-link px-3 ${isDark && "link-light"}`}>Sign up</Link>
                  </li>
                }
                {
                  userObjLength > 0 && decodedToken && decodedToken.role === 'admin' &&
                  <li className="nav-item" data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"
                  onClick={() => navigate('/admin-dashboard')}

                  >
                    <Link to="/admin-dashboard" className={`nav-link px-3 ${isDark && "link-light"}`}>Admin</Link>
                  </li>
                }
                {
                  userObjLength > 0 &&

                  <li className="nav-item ProfileImage-SmallScreens" 
                    onClick={() => navigate('/profile')}
                  >
                    <Link to="/profile">
                      {/*--hidden in small screens--*/}
                      
                      { user.profilePic ? <img src={user.profilePic} alt='Profile' className='profile-image-nav' />
                       : <img src={require('../../asset/images/Profile-Image.png')} alt='Profile' />
                       }
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}


export default Navbar;