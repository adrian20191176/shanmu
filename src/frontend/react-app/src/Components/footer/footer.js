import { Link } from 'react-router-dom';
import { ThemeContext } from "../../App"; 
import { useContext } from "react";

import '../footer/footer.scss';
import '../../styles/overrides.scss';
import '../../styles/variables.scss';

import navlogo from '../../asset/images/SelfEd.svg';

const Footer = () => {

    const { isDark } = useContext(ThemeContext);

    return (
        <footer className={`${isDark && "footer-dark"}`}>
            <div className={`py-4 px-2 Footer ${isDark && "text-light bg-dark"}`}>
                <div className='Branding'>
                    <Link className="navbar-brand pb-3 pb-lg-0 pe-5 ps-3 mr-5" to="/"> <h5><span style={isDark ? { color: '#FFF'} : {color: '#292929'} }>Self</span>Ed</h5></Link>
                    <p>Copyright ©  2022 SelfEd | All Rights Reserved</p>
                </div>
                <div className='Footer-links'>
                    <ul className={`navbar-nav mb-2 mb-lg-0 Regular-Body ${isDark && "footer-links-dark"}`}>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/privacy-policy">Privacy policy</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/About">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/help">Help</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}


export default Footer;