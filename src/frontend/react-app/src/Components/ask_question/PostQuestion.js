import './PostQuestion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-responsive-modal/styles.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-quill/dist/quill.snow.css';



import categoryOptions from '../../commonFunc/categoryOptions';
import { subcategory } from '../../commonFunc/categoryOptions';
import FileBase64 from 'react-file-base64';

import { Modal } from 'react-responsive-modal';
import ReactQuill from 'react-quill';

import { useState, useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, ThemeContext } from '../../App';
import { privateAPI } from '../../api';

const PostQuestion = () => {

    const [questionData, setQuestionData] = useState({
      category: 'it',
      subCategory: 'cs',
    });

    const [description, setDescription] = useState();

    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [tags, setTags] = useState([])
    const { user } = useContext(UserContext);
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();
    

    function handleSubmit(e) {
        e.preventDefault();
        const obj = {...questionData};
        obj.description = description;

        if (!obj.title || !obj.description) {
          setOpenModal(true);
          setModalMsg('Question title or description is empty !')
          return ;
        }

        obj.date = new Date().toISOString();
        obj.user = user ? user.userId : '';
        obj.tags = tags;


        const postQuestion = async () => {
          const response = await privateAPI.post('/question', obj);
          if (response.status === 201) {
            setOpenModal(true);
            setModalMsg('Posted Question Successfully !');
            setTimeout(() => {
              navigate('/');
            }, 2000)
          } else {
            setOpenModal(true);
            setModalMsg('Unable to post question');
          }
        }
        postQuestion();
     
    }

    function getFiles(files){
      setQuestionData({
        ...questionData,
        img: files[0].base64
      })
    }
// adding tags
    
    function handleKeypress(e){
        if(e.key !== ' ') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (

      <>
                <form className="Regular-Body" onSubmit={handleSubmit}>
            <div className="form-group col-md-4 mb-4">
                <select id="inputState" className="form-control grey-bg"
                    value={questionData.category}
                    onChange={(e) => 
                  {
                    setQuestionData({
                      ...questionData,
                      category: e.target.value
                  })
                  }
                    }
                >
                  {
                    categoryOptions.map((category) => (
                      <option value={category.value} key={category.value}>{category.option}</option>
                    ))
                  }
                </select>
            </div>
            <div className="form-group col-md-3 mb-5">
                <select id="inputState" className="form-control grey-bg"
                  value={questionData.subCategory}
                        onChange={(e) => {
                          setQuestionData({
                            ...questionData,
                            subCategory: e.target.value
                        })
                        }}
                >
                    {
                      subcategory.filter(sub => sub.type === questionData.category)[0][questionData.category].map(subcat => (
                        <option value={subcat.value} key={subcat.value}>
                          {subcat.option}
                        </option>
                      ))
                    }
                </select>
            </div>
            <div className="form-group mb-4">
                <label htmlfor="exampleInputEmail1" className ="Regular-SubTitle mb-3">Title</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter question title" onChange={(e) => setQuestionData({
                    ...questionData,
                    title: e.target.value
                })} />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="exampleInputPassword1" className ="Regular-SubTitle mb-3">Description</label>
                {useMemo(() => (
                  <ReactQuill theme="snow" value={description} onChange={setDescription} />
                ), [])}
            </div>
            <div className="form-group mb-4">
                <label htmlFor="exampleInputEmail1" className ="Regular-SubTitle mb-3">Upload Image</label>
                <br/>

                <FileBase64
                multiple={ true }
                onDone={getFiles}
                inputProps={{ accept: 'image/*' }} />
               
            </div>

            {/* adding tag input */}
            <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className={isDark ? "tag-item-dark" : "tag-item"} key={index}>
                    <span className={isDark ? "text-dark" : "text"}>{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeypress} type="text" className="tags-input form-control" placeholder="Add relevant tags" />
        </div>
        <div>
        <small>Add relevant tags by pressing space key</small>
        </div>
     

            <button type="submit" className="btn btn-primary mt-lg-4">Submit</button>
        </form>

        <Modal open={openModal} onClose={() => setOpenModal(false)} center>
          <p className='Error-Modal'>{modalMsg}</p>
        </Modal>
      </>
    )
}



export default PostQuestion;