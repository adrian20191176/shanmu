import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, ThemeContext } from '../../App';

import "./LandingPage.scss";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from '../../Components/footer/footer';
import Question from '../../Components/question/Question';
import InfiniteScroll from "react-infinite-scroll-component";
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



export default function LandingPage({items, setItems, query}) {
  
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);
  const [pageNo, setPageNo] = useState(1);
  const [engineeringPNo, setEngineeringPNo] = useState(1);
  const [itPNo, setItPNo] = useState(1);
  const [bioPNo, setBioPNo] = useState(1);
  const [lawPNo, setLawPNo] = useState(1);
  const [commercePNo, setCommercePNo] = useState(1);
  const [artsPNo, setArtsPNo] = useState(1);
  const [mathsPNo, setMathsPNo] = useState(1);
  const [chemistryPNo, setChemistryPNo] = useState(1);
  const [physicsPNo, setPhysicsPNo] = useState(1);
  const [humanitiesPNo, setHumanitiesPNo] = useState(1);
  const [mediaPNo, setMediaPNo] = useState(1);
  const [hospitalityPNo, setHospitalityPNo] = useState(1);
  const [agriculturePNo, setAgriculturePNo] = useState(1);
  const [isHasMore, setIsHasMore] = useState(null);

  const filterredItems = items.filter(item => {
    return item.title?.toLowerCase().includes(query.toLowerCase());
  })



  const getQuestions = async (pageNo = 1) => {
    const questions = await publicAPI.get(`/question?page=${pageNo}&limit=10`);
    // const questions = await publicAPI.get(`/question`);
    if (questions.status === 200 || questions.status === 304) {
      setIsError(false);
      setPageNo(pageNo + 1);
      let copy = questions.data;
      if (pageNo > 1) {
        copy = [...items.concat(questions.data)];
      } 
      setItems(copy);

      if (questions.data.length === 0) {
        setIsHasMore({
          ...isHasMore,
          common: false
        })
      } else {
        setIsHasMore({
          ...isHasMore,
          common: true
        })
      }
    } else {
      setIsError(true); 
      
    }
  }

  useEffect(() => {
    getQuestions();
  }, [])

  const { user } = useContext(UserContext);

  const displayQuestions = filterredItems.map((question, index) => {

    return (
      <>
        <Question
          key={question._id} 
          props={question}
          isSpecific={false}
        />
      </>
    )
  });



  const getCategoryQuestions = async (category, pageNo = 1) => {
    const questions = await publicAPI.get(`/question?category=${category}&page=${pageNo}&limit=10`);
    // const questions = await publicAPI.get(`/question?category=${category}`);
    if (questions.status === 200 || questions.status === 304) {
      if (questions.data.length === 0) {
        // setIsError(true);
        setIsHasMore({
          ...isHasMore,
          [category]: false
        })
      } else {
        setIsHasMore({
          ...isHasMore,
          [category]: true
        })
        setIsError(false);

        if (category === 'engineering') {
          setEngineeringPNo(engineeringPNo + 1);
          let copy = questions.data;
          if (engineeringPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'it') {
          setItPNo(itPNo + 1);
          let copy = questions.data;
          if (itPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'biology') {
          setBioPNo(bioPNo + 1);
          let copy = questions.data;
          if (bioPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'law') {
          setLawPNo(lawPNo + 1);
          let copy = questions.data;
          if (lawPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'commerce') {
          setCommercePNo(commercePNo + 1);
          let copy = questions.data;
          if (commercePNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'arts') {
          setArtsPNo(artsPNo + 1);
          let copy = questions.data;
          if (artsPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'maths') {
          setMathsPNo(mathsPNo + 1);
          let copy = questions.data;
          if (mathsPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'chemistry') {
          setChemistryPNo(chemistryPNo + 1);
          let copy = questions.data;
          if (chemistryPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        
        else if (category === 'physics') {
          setPhysicsPNo(physicsPNo + 1);
          let copy = questions.data;
          if (physicsPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'humanities') {
          setHumanitiesPNo(humanitiesPNo + 1);
          let copy = questions.data;
          if (humanitiesPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'media') {
          setMediaPNo(mediaPNo + 1);
          let copy = questions.data;
          if (mediaPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        
        else if (category === 'hospitality') {
          setHospitalityPNo(hospitalityPNo + 1);
          let copy = questions.data;
          if (hospitalityPNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }

        else if (category === 'agriculture') {
          setAgriculturePNo(agriculturePNo + 1);
          let copy = questions.data;
          if (agriculturePNo > 1) {
            copy = [...items.concat(questions.data)];
          } 
          setItems(copy);

        }
        // setItems(questions.data);
      }
    } else {
      setIsError(true); 
    }
  }

  return (
    <>
      <div className="Landing">
        <Tabs className={`react-tabs ${isDark && "text-light bg-custom-black"}`}>
          <div className={`TabList ${isDark && "text-light bg-custom-black"}`}>
            <TabList className={`react-tabs__tab-list ${isDark && "bg-dark text-light"}`}>
              <Tab className={`${isDark && "bg-dark text-light mobile-tabs-darkMode"} react-tabs__tab`}
                onClick={() => {
                  getQuestions();
                  setPageNo(() => 1);
                }}
              >
                <div className={`IconTabs`}>
                  <TrendingUpOutlinedIcon fontSize='small'></TrendingUpOutlinedIcon>
                  <p>Popular</p>
                </div>
                
              </Tab>
              <Tab
                className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('engineering', 1);
                }}
              >
                <div className="IconTabs">
                  <BuildOutlinedIcon fontSize='small'></BuildOutlinedIcon>
                  <p>Engineering</p>
                </div>
              </Tab>
              <Tab
                className={`react-tabs__tab ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('it', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('biology', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('law', 1);
                  setPageNo(() => 1);
                }}
              >
                <div className="IconTabs">
                  <GavelOutlinedIcon fontSize='small'></GavelOutlinedIcon>
                  <p>Law</p>
                </div>
              </Tab>
              <Tab
                className={`react-tabs__tab ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('commerce', 1);
                  setPageNo(() => 1);
                }}
              >
                <div className="IconTabs">
                  <StoreOutlinedIcon fontSize='small'></StoreOutlinedIcon>
                  <p>Commerce</p>
                </div>
              </Tab>
              <Tab
                className={`react-tabs__tab ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('arts', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('maths', 1);
                  setPageNo(() => 1);
                }}
              >
                <div className="IconTabs">
                  <CalculateOutlinedIcon fontSize='small'></CalculateOutlinedIcon>
                  <p>Maths</p>
                </div>
              </Tab>
              <Tab
                className={`react-tabs__tab ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('chemistry', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('physics', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('humanities', 1);
                  setPageNo(() => 1);
                }}
                >
                <div className="IconTabs">
                  <GroupsOutlinedIcon fontSize='small'></GroupsOutlinedIcon>
                  <p>Humanities</p>
                </div>
              </Tab>
              <Tab
                className={`react-tabs__tab  ${isDark && "bg-dark text-light mobile-tabs-darkMode"}`}
                onClick={() => {
                  getCategoryQuestions('media', 1);
                  setPageNo(() => 1);
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
                  getCategoryQuestions('hospitality', 1);
                  setPageNo(() => 1);
                }}
                >
                <div className="IconTabs">
                  <EmojiFoodBeverageOutlinedIcon fontSize='small'></EmojiFoodBeverageOutlinedIcon>
                  <p>Hospitality</p>
                </div>
              </Tab>
              <Tab
                className={`${isDark && "bg-dark text-light"} react-tabs__tab mobile-tabs-darkMode`}
                onClick={() => {
                  getCategoryQuestions('agriculture', 1);
                  setPageNo(() => 1);
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getQuestions(pageNo)}
                    hasMore={isHasMore?.common}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 

             ( 
              <InfiniteScroll
                dataLength={filterredItems.length}
                next={() => getCategoryQuestions('engineering', engineeringPNo)}
                hasMore={isHasMore?.engineering}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p className='reached-end'>You have reached the end</p>
                }
              >
               { displayQuestions }
              
              </InfiniteScroll>
              )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('it', itPNo)}
                    hasMore={isHasMore?.it}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('biology', bioPNo)}
                    hasMore={isHasMore?.biology}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('law', lawPNo)}
                    hasMore={isHasMore?.law}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
               
               ( 
                <InfiniteScroll
                  dataLength={filterredItems.length}
                  next={() => getCategoryQuestions('commerce', commercePNo)}
                  hasMore={isHasMore?.commerce}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p className='reached-end'>You have reached the end</p>
                  }
                >
                 { displayQuestions }
                
                </InfiniteScroll>
                )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('arts', artsPNo)}
                    hasMore={isHasMore?.arts}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('maths', mathsPNo)}
                    hasMore={isHasMore?.maths}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                 ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('chemistry', chemistryPNo)}
                    hasMore={isHasMore?.chemistry}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                 ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('physics', physicsPNo)}
                    hasMore={isHasMore?.physics}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('humanities', humanitiesPNo)}
                    hasMore={isHasMore?.humanities}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                
                ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('media', mediaPNo)}
                    hasMore={isHasMore?.media}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                 ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('hospitality', hospitalityPNo)}
                    hasMore={isHasMore?.hospitality}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
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
              {isError ? <div className='unable-to-load' >Unable to Load Data</div> : 
                 ( 
                  <InfiniteScroll
                    dataLength={filterredItems.length}
                    next={() => getCategoryQuestions('agriculture', agriculturePNo)}
                    hasMore={isHasMore?.agriculture}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p className='reached-end'>You have reached the end</p>
                    }
                  >
                   { displayQuestions }
                  
                  </InfiniteScroll>
                  )
              }
            </TabPanel>

          </div>
        </Tabs>

      </div>
      <Footer />
    </>
  )
}