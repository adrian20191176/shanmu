import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext, ThemeContext } from '../../App';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import "./ViewQuestion.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from '../../Components/footer/footer';
import Question from '../../Components/question/Question';
//MUI Icons
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
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
import { publicAPI } from '../../api/publicAPI';



export default function ViewQuestion() {
  
  const [questions, setQuestions] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const questionParams = searchParams.get('id');
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);

  const getQuestions = async () => {
    const questions = await publicAPI.get(`/question?id=${questionParams}`);
    if (questions.status === 200 || questions.status === 304) {
      setIsError(false);
      setQuestions([questions.data]);
    } else {
      setIsError(true); 
    }
  }

  useEffect(() => {
    getQuestions();
  }, [])


  const displayQuestions = questions.map(question => {
    return (
      <>
        <Question
          key={question._id} 
          props={question}
          isSpecific={true}
        />
      </>
    )
  });


  const getCategoryQuestions = async (category) => {
    const questions = await publicAPI.get(`/question?category=${category}`);
    if (questions.status === 200 || questions.status === 304) {
      if (questions.data.length === 0) {
        setIsError(true);
      } else {
        setIsError(false);
        setQuestions(questions.data);
      }
    } else {
      setIsError(true); 
    }
  }

  return (
    <>
      <div className='Landing'>
        <Tabs className={`react-tabs ${isDark && "text-light bg-custom-black"}`}>
          <div className={`TabList ${isDark && "text-light bg-custom-black"}`}>
            <TabList className={`react-tabs__tab-list ${isDark && "bg-dark text-light"}`}>
              <Tab
               className={`${isDark && "bg-dark text-light mobile-tabs-darkMode"} react-tabs__tab`}
                onClick={() => {
                  navigate('/');
                  getQuestions();
                }}
              >
                <div className="IconTabs">
                  <TrendingUpOutlinedIcon fontSize='small'></TrendingUpOutlinedIcon>
                  <p>Popular</p>
                </div>
                
              </Tab>
              <Tab
                className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('engineering');
                }}
              >
                <div className="IconTabs">
                  <BuildOutlinedIcon fontSize='small'></BuildOutlinedIcon>
                  <p>Engineering</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('it');
                }}
              >
                <div className="IconTabs">
                  <ComputerOutlinedIcon fontSize='small'></ComputerOutlinedIcon>
                  <p>IT</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('biology');
                }}
              >
                <div className="IconTabs">
                  <CoronavirusOutlinedIcon fontSize='small'></CoronavirusOutlinedIcon>
                  <p>Biology</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('law');
                }}
              >
                <div className="IconTabs">
                  <GavelOutlinedIcon fontSize='small'></GavelOutlinedIcon>
                  <p>Law</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('commerce');
                }}
              >
                <div className="IconTabs">
                  <StoreOutlinedIcon fontSize='small'></StoreOutlinedIcon>
                  <p>Commerce</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('arts');
                }}
              >
                <div className="IconTabs">
                  <ColorLensOutlinedIcon fontSize='small'></ColorLensOutlinedIcon>
                  <p>Arts</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('maths');
                }}
              >
                <div className="IconTabs">
                  <CalculateOutlinedIcon fontSize='small'></CalculateOutlinedIcon>
                  <p>Maths</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('chemistry');
                }}
              >
                <div className="IconTabs">
                  <ScienceOutlinedIcon fontSize='small'></ScienceOutlinedIcon>
                  <p>Chemistry</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('physics');
                }}
                >
                <div className="IconTabs">
                  <FilterVintageOutlinedIcon fontSize='small'></FilterVintageOutlinedIcon>
                  <p>Physics</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('humanities');
                }}
                >
                <div className="IconTabs">
                  <GroupsOutlinedIcon fontSize='small'></GroupsOutlinedIcon>
                  <p>Humanities</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() =>{
                  navigate('/');
                  getCategoryQuestions('media');
                }}
                >
                <div className="IconTabs">
                  <VideoCameraBackOutlinedIcon fontSize='small'></VideoCameraBackOutlinedIcon>
                  <p>Media</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('hospitality');
                }}
                >
                <div className="IconTabs">
                  <EmojiFoodBeverageOutlinedIcon fontSize='small'></EmojiFoodBeverageOutlinedIcon>
                  <p>Hospitality</p>
                </div>
              </Tab>
              <Tab
              className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  navigate('/');
                  getCategoryQuestions('agriculture');
                }}
                >
                <div className="IconTabs">
                  <GrassOutlinedIcon fontSize='small'></GrassOutlinedIcon>
                  <p>Agriculture</p>
                </div>
              </Tab>
            </TabList>
          </div>

          {/*---   Landing page content   ---*/}
          <div className={`TabPanel ${isDark && "bg-custom-black text-light"}`}>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Popular</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn" 
                onClick={() => {
                  if (user) {
                    navigate('/ask-question');
                  } else {
                    navigate('/login');
                  }
                }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
              {/*Test your components above this*/}
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Engineering</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                     onClick={() => {
                      if (user) {
                        navigate('/ask-question');
                      } else {
                        navigate('/login');
                      }
                    }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>IT</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                     onClick={() => {
                      if (user) {
                        navigate('/ask-question');
                      } else {
                        navigate('/login');
                      }
                    }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Biology</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Law</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                     onClick={() => {
                      if (user) {
                        navigate('/ask-question');
                      } else {
                        navigate('/login');
                      }
                    }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Commerce</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                     onClick={() => {
                      if (user) {
                        navigate('/ask-question');
                      } else {
                        navigate('/login');
                      }
                    }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Arts</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                     onClick={() => {
                      if (user) {
                        navigate('/ask-question');
                      } else {
                        navigate('/login');
                      }
                    }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Maths</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                
                onClick={() => {
                  if (user) {
                    navigate('/ask-question');
                  } else {
                    navigate('/login');
                  }
                }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Chemistry</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Physics</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Humanities</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Media</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Hospitality</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>
            <TabPanel>
              <div className="panel-content-header">
                <h4 className='Medium-H4'>Agriculture</h4>
                <button type="button" className="btn btn-primary btn-sm Ask-question-btn"
                   onClick={() => {
                    if (user) {
                      navigate('/ask-question');
                    } else {
                      navigate('/login');
                    }
                  }}
                >Ask Question</button>
              </div>
              {isError ? <div>Unable to Load Data</div> : 
                displayQuestions
              }
            </TabPanel>

          </div>
        </Tabs>

      </div>
      <Footer />
    </>
  )
}