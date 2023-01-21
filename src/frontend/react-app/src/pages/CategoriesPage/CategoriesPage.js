import "./CategoriesPage.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App"; 
import { useContext } from "react";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';

const CategoriesPage = () => {

  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`col-12 px-4 Medium-Body-sub-text-2 ${isDark && "bg-custom-black"}`}>
      <div className="Content-header">
        <button type="button" className={`btn btn-sm btn-link Back-btn me-4 ${isDark && "text-light"}`}
            onClick={() => navigate(-1)}
        
        >
          <ArrowBackOutlinedIcon />
        </button>
        <h4 className={`Medium-H4 ms-lg-4 ${isDark && "text-light"}`}>Categories</h4>
      </div>

      <div className="CategoriesContent">

        <div className="CardRow">
          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/engineering')}
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><BuildOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"} ></BuildOutlinedIcon><p>Engineering</p></div>
            <p className="CategoryDescription">Engineering is the design, testing and construction of machines, structures and processes using mathematics and the natural sciences. It is a decipline dedicated t solve problems.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/it')}
          
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><ComputerOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></ComputerOutlinedIcon><p>IT</p></div>
            <p className="CategoryDescription">IT is the application of technology to solve organizational and business problems. This field of engineering uses computers, networks, storage and other technical infrastructure, both hardware and software to handle and manipulate information.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/biology')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><CoronavirusOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></CoronavirusOutlinedIcon><p>Biology</p></div>
            <p className="CategoryDescription">Biology is a branch of science that studies living things. It is a very large and broad field due to the wide variety of life on Earth, so individual biologists tend to focus on a specific field. These fields are either categorized by the scale of life or by the types of organisms studied.</p>
          </div>
        </div>

        <div className="CardRow">
          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/law')}
          
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><GavelOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></GavelOutlinedIcon><p>Law</p></div>
            <p className="CategoryDescription">Law is outlined as principles and regulations laid down by a governing body and have binding legal force. Citizens must approve and abide by it, subject to sanctions or legal consequences. It shows the will of the supreme state power.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/commerce')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><StoreOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></StoreOutlinedIcon><p>Commerce</p></div>
            <p className="CategoryDescription">Commerce deals with various aspects of business, commerce, accounting, financial information/transactions and merchandising. Trade plays a significant role in the development of nations and their citizens by facilitating trade between nations or within a nation.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/arts')}
          
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><ColorLensOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></ColorLensOutlinedIcon><p>Arts</p></div>
            <p className="CategoryDescription">The Humanities stream which is popularly known as 'Arts' provides students with a platform to study human society and the world. It is quite a vast stream which offers numerous career options to the students. From studying how people interact in a group setting to understanding the legal rights of citizens, everything falls under the purview of Art Stream entities.</p>
          </div>
        </div>

        <div className="CardRow">
          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/maths')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><CalculateOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></CalculateOutlinedIcon><p>Maths</p></div>
            <p className="CategoryDescription">Mathematics is the science and study of quality, structure, space and change. Mathematicians search for patterns, formulate new conjectures, and establish truth by rigorous deduction from well-chosen axioms and definitions.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/chemistry')}
          
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><ScienceOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></ScienceOutlinedIcon><p>Chemistry</p></div>
            <p className="CategoryDescription">Chemistry is the scientific study of the properties and behavior of matter. It is a natural science that covers the elements that make up matter to the compounds made of atoms, molecules and ions: their composition, structure, properties, behavior and the changes they undergo during a reaction with other substances.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/physics')}
          
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><FilterVintageOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></FilterVintageOutlinedIcon><p>Physics</p></div>
            <p className="CategoryDescription">The branch of science concerned with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms.</p>
          </div>
        </div>

        <div className="CardRow">
          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
          
          onClick={() => navigate('/categories/humanities')}
          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><GroupsOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></GroupsOutlinedIcon><p>Humanities</p></div>
            <p className="CategoryDescription">Humanities are academic disciplines that study aspects of human society and culture. In the Renaissance, the term contrasted with divinity and referred to what is now called classics, the main area of secular study in universities at the time.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/media')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><VideoCameraBackOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></VideoCameraBackOutlinedIcon><p>Media</p></div>
            <p className="CategoryDescription">Media are the communication outlets or tools used to store and deliver information or data. The term refers to components of the mass media communications industry, such as print media, publishing, the news media, photography, cinema, broadcasting (radio and television), digital media, and advertising.</p>
          </div>

          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/hospitality')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><EmojiFoodBeverageOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></EmojiFoodBeverageOutlinedIcon><p>Hospitality</p></div>
            <p className="CategoryDescription">Hospitality is the relationship between a guest and a host, wherein the host receives the guest with some amount of goodwill, including the reception and entertainment of guests, visitors, or strangers.</p>
          </div>
        </div>

        <div className="CardRow">
          <div className={`CategoryCard ${isDark && "bg-custom-black text-light"}`}
            onClick={() => navigate('/categories/agriculture')}

          >
            <div className={`CategoryTag ${isDark && "bg-dark text-light"}`}><GrassOutlinedIcon fontSize='small' sx={isDark && "color: #FFF"}></GrassOutlinedIcon><p>Agriculture</p></div>
            <p className="CategoryDescription">Agriculture or farming is the practice of cultivating plants and livestock. Agriculture was the key development in the rise of sedentary human civilization, whereby farming of domesticated species created food surpluses that enabled people to live in cities.</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CategoriesPage;
