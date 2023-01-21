import "./EditProfile.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from "../../Components/toggleSwitch/toggleSwitch";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import UserImage from "../../asset/images/UserImage.svg";
import Tag from "../../Components/question/Tag";
import { publicAPI } from "../../api/publicAPI";
import { useNavigate } from 'react-router-dom';
import { UserContext, ThemeContext } from "../../App";
import { useContext, useState, useRef } from "react";
import categoryOptions from "../../commonFunc/categoryOptions";
import FileBase64 from 'react-file-base64';
import { privateAPI } from "../../api";


const EditProfile = () => {

  const navigate = useNavigate();
  const { user, setupUser } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const [updateUser, setUpdateUser] = useState({...user, senderId: user.userId});
  const selectRef = useRef(null);

  const logout = async () => {
    const response = await publicAPI.get('/token');

    if (response.status === 200) {
      navigate('/login');
      setupUser({});
    } else {
    }
  }

  const handleSelect = () => {
    if (selectRef.current !== null) {
      setUpdateUser(prev => {
        if (prev.categories) {
          if (!prev.categories.includes(selectRef.current.value)) {
            return {
              ...updateUser,
              categories: [...prev.categories, selectRef.current.value]
            }
          } else {
            return {
              ...updateUser,
              categories: [...prev.categories]
            }
          }
        } else {
          return {
            ...updateUser,
            categories: [selectRef.current.value]
          }
        }
      }
      )
    }
  };

  function getFiles(files) {
    setUpdateUser({
      ...updateUser,
      profilePic: files.base64
    })
  }


  function handleSubmit(e) {
    e.preventDefault();

    const postData = async () => {
      const response = await privateAPI.patch('/user', updateUser);
      if (response.status === 200) {
        navigate('/profile');
        setupUser(updateUser);
      } else {
      }
    }

    postData();
  }

  return (
    <form className={`col-12 px-4 Medium-Body-sub-text-2 mb-lg-4 vh-100 ${isDark && "bg-custom-black text-light"}`} onSubmit={(e) => handleSubmit(e)}>
      <div className="Top-header">
        <div className="Content-header">
          <button type="button" className="btn btn-sm btn-link me-4 Back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowBackOutlinedIcon sx={isDark && "color: #FFF"} />
          </button>
          <h4 className="Medium-H4 ms-lg-4">My Profile</h4>
        </div>
        <div className="Top-header-BtnGroup">
          <span id="theme-switch" >
            <p>Light</p>
            <Switch />
            <p>Dark</p>
          </span>
          <button type="button" className="btn btn-primary btn-sm Top-LogOut-btn" onClick={logout}>Log&nbsp;Out</button>
        </div>
      </div>

      <div className="Profile-details">
        <div className="Image-section">
          {
            user.profilePic ?
              <img src={user.profilePic} alt='user-profile' className="img-fluid" />
              :
              <img src={UserImage} alt="UserImage" />
          }

          <FileBase64
            multiple={false}
            onDone={getFiles}
            inputProps={{ accept: 'image/*' }} />
        </div>

        <div className="User-details">

          <div className="d-flex flex-row UserName">
            <label htmlFor="input-username" className="form-label">User Name : </label>
            <input type="text" className="form-control" id="input-username" aria-describedby="input-username"
              placeholder={user.username}
              onChange={(e) => setUpdateUser({
                ...updateUser,
                username: e.target.value
              })}
            />
          </div>

          <div className="d-flex flex-row mt-2 mt-lg-3 AddTags">
            <label htmlFor="input-username" className="form-label">Add Tags : </label>
            <select className="form-select" aria-label="Default select example" defaultValue={''}
              ref={selectRef}
            >
              <option value="" disabled>Category</option>
              {categoryOptions.map(option => (
                <option value={option.value}>{option.option}</option>
              ))}
            </select>
            <button type="button" className={`btn btn-outline-primary btn-sm normal-btn Add-tag-btn ms-3 ${isDark && "bg-purple text-light"}`}
              onClick={handleSelect}
            >
              Add
            </button>
          </div>

          <div className="User-activities">
            {/*--below section is for desktop view only (to be hidden in mobile view)--*/}
            <section className="User-interests">
              {updateUser.categories && updateUser.categories.length > 0 && <p className="Regular-Tag-1">Interested in :</p>}
              <div>
                {/* <Tag text={"category1"} /> */}
                {updateUser.categories && updateUser.categories.map(category => (
                  <Tag text={category} key={category} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*--below section is for mobile view only (to be hidden in desktop view)--*/}
      <section className="User-interests-mobile-view">
        {updateUser.categories && updateUser.categories.length > 0 && <p className="Regular-Tag-1">Interested in :</p>}
        <div>
          {/* <Tag text={"category1"} /> */}
          {updateUser.categories && updateUser.categories.map(category => (
            <Tag text={category} />
          ))}
        </div>
      </section>

      <div className="Regular-Body User-description">
        <label htmlFor="input-description" className="form-label">User Description : </label>
        <input type="text" className="form-control" id="input-description" aria-describedby="input-description"
          placeholder={user.about}
          onChange={(e) => setUpdateUser({
            ...updateUser,
            about: e.target.value
          })}
        />
      </div>

      {/*--change display:'block' to show and display:'none' to hide the below buttons--*/}
      <div className="ButtonGroup-bottom">
        <button style={{ display: 'block' }} type="submit" className={`btn btn-outline-primary btn-sm Edit-profile-btn  ${isDark && "bg-purple text-light"}`}>
          Save
        </button> {/*--show to user--*/}
        <button type="button" className="btn btn-primary btn-sm LogOut-btn">Log Out</button> {/*--show to user--*/}
      </div>
    </form>
  )
}

export default EditProfile;
