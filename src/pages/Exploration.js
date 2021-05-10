import { Card, CardContent, Checkbox, FormControlLabel, LinearProgress, TextField } from "@material-ui/core";
import React, { useState } from "react"
import Resize from "react-resize-layout/dist/Resize";
import ResizeHorizon from "react-resize-layout/dist/ResizeHorizon";
import ResizeVertical from "react-resize-layout/dist/ResizeVertical";
import { Redirect, useParams } from "react-router";
import ChatMessage from "../components/ChatMessage";
import ContentWrapper, { ContentButtonWrapper } from "../components/ContentWrapper";
import { AgentSpace, NavVideosWrapper, NavVideoWrapper, SubTopicList, SubTopicNavWrapper, SubTopicWrapper, VideoWrapper } from "../components/ExplorationUI";
import { ProgressHeader, ProgressWrapper } from "../components/Progress";
import explorations from "../data/explorations";
import { topicLabels } from "../data/topics";
import { Button } from "../components/Button"
import { EaseUp } from "../components/EaseUp";

export default function Exploration() {
  let { id } = useParams();

  const subTopics = explorations[id]

  const [selectedVideo, setSelectedVideo] = useState()

  const [currSubTopics, setCurrSubTopics] = useState(subTopics)

  const [showOptions, setShowOptions] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [videoAdded, setVideoAdded] = useState(false)
  const [noVideoAdded, setNoVideoAdded] = useState(false)
  const [question, setQuestion] = useState("")
  const [asqQuestion, setAskQuestion] = useState(false)

  const [redirectToPost, setRedirectToPost] = useState(false)


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }

  const countItems = currSubTopics.map(st => {
    return st.videos.length 
  }).reduce((ac, e) => {
    return ac + e
  }, 0)

  const doneItems = currSubTopics.map(st => {
    return st.videos.filter(v => v.show).length 
  }).reduce((ac, e) => {
    return ac + e
  }, 0)

  const progress = doneItems * 100 / countItems

  const handleNav = (video) => {
    setSelectedVideo(video)
  }

  const enableOptions = () => {
    setShowOptions(true)
    setShowChat(false)
    setAskQuestion(false)
  }
  

  const enableChat = () => {
    if (countItems - doneItems === 0) {
      setRedirectToPost(true)
    }
    setShowChat(true)
    setTimeout(() => {
      setAskQuestion(true)
    }, 3000)
    setVideoAdded(false)
    setNoVideoAdded(false)
  }

  const addVideo = (subTopic, video) => {
    setCurrSubTopics(currSubTopics.map(st => {
      if (st.subTopic === subTopic.subTopic) {
        return {
          ...st,
          videos: st.videos.map(v => {
            if (v.label === video.label) {
              return {
                ...v,
                show: true
              }
            }
            return v
          })
        }
      }
      return st
    }))
    setShowChat(false)
    setAskQuestion(false)
    setShowOptions(false)
    setVideoAdded(true)
    setSelectedVideo(null)
  }

  const handleNoQuestion = () => {
    setShowChat(false)
    setAskQuestion(false)
    setShowOptions(false)
    setNoVideoAdded(true)
  }

  return <div>
    {
      redirectToPost &&
      <Redirect to={`/post-exploration/${id}`} />
    }
    <div style={{ position: "relative", height: 'calc(100vh)' }}>

      <Resize handleWidth="5px" handleColor="#777">
        <ResizeVertical height="100px" minHeight="10px">
          <ProgressHeader>
            <h2>Tu peux encore ouvrir {countItems - doneItems} ressources cachées</h2>
            <ProgressWrapper>
              <LinearProgress height="10px" variant="determinate" value={progress} />
            </ProgressWrapper>
          </ProgressHeader>
        </ResizeVertical>
        <ResizeVertical>
          <Resize>
            <ResizeHorizon width="calc(100vw / 8 * 2)">
              <SubTopicNavWrapper>
                <h1>Table de contenu</h1>
                <h1>pour <strong>{topicLabels[id]}</strong></h1>

                {
                  currSubTopics.map(st => {
                    return <SubTopicWrapper>
                      <h2>{st.subTopic}</h2>
                      <NavVideosWrapper>
                        {
                          st.videos.map(v => {
                            if (v.show) {
                              return <NavVideoWrapper onClick={() => handleNav(v)}>
                                <img src={v.icon} />
                                <h3>{v.label}</h3>
                              </NavVideoWrapper>
                            }
                          })
                        }
                      </NavVideosWrapper>
                    </SubTopicWrapper>
                  })
                }
              </SubTopicNavWrapper>
            </ResizeHorizon>
            <ResizeHorizon width="calc(100vw / 8 * 4)">
              <ContentWrapper center>
                <h1>Contenu</h1>
                {
                  selectedVideo &&
                  <>
                    <VideoWrapper>
                      <h2>{selectedVideo.label}</h2>
                      {
                        selectedVideo.yt &&
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${selectedVideo.yt}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      }
                      {
                        selectedVideo.vd &&
                        <video width="560" height="315" controls>
                          <source src={selectedVideo.vd} type="video/mp4" />
                        </video>
                      }
                    </VideoWrapper>
                    <ContentButtonWrapper>
                      <Button onClick={enableChat} variant="contained">J'ai fini de visionner</Button>
                    </ContentButtonWrapper>
                  </>
                }
              </ContentWrapper>
            </ResizeHorizon>
            <ResizeHorizon width="calc(100vw / 8 * 3)">
              {
                showOptions &&
                <AgentSpace>
                  <ChatMessage text={
                    `Merci pour ta(es) question(s). Tu peux maintenant sélectionner la vidéo que veux que j'ouvre pour toi:`
                  } />
                  <EaseUp>
                    <Card>
                      <CardContent>
                        
                        {
                          currSubTopics.map(st => {
                            if (st.videos.filter(v => !v.show).length) {
                              return <div>
                                <p>
                                  Theme: {st.subTopic}
                                </p>
                                <ul>
                                  {
                                    st.videos.map(v => {
                                      if (!v.show) {
                                        return <FormControlLabel
                                        control={
                                          <Checkbox color="primary"
                                            onChange={() => addVideo(st, v)}
                                            name="gilad" />
                                        }
                                        label={v.label}
                                      />
                                      }
                                    })
                                  }
                                </ul>
                              </div>
                            }
                          })
                        }
                      </CardContent>
                    </Card>
                  </EaseUp>
                </AgentSpace>
              }
              {
                showChat &&
                <AgentSpace>
                  <ChatMessage text={
                    `J'espère que tu as apprécié cette vidéo. Si tu le souhaites, tu peux demander une autre vidéo de la liste suivante que j'ai pour toi:`
                  } />
                  <EaseUp>
                    <Card>
                      <CardContent>
                        <SubTopicList>
                            {
                              currSubTopics.map(st => {
                                if (st.videos.filter(v => !v.show).length) {
                                  return <div>
                                    <p>
                                      Theme: {st.subTopic}
                                    </p>
                                    <ul>
                                      {
                                        st.videos.map(v => {
                                          if (!v.show) {
                                            return <li>{v.label}</li>
                                          }
                                        })
                                      }
                                    </ul>
                                  </div>
                                }
                              })
                            }
                          </SubTopicList>
                      </CardContent>
                    </Card>
                  </EaseUp>

                  {
                    asqQuestion &&
                    <>
                      <ChatMessage text={
                        `Mais pour ça, tu dois tout d'abord me poser une question par rapport à la vidéo que tu viens de voir.`
                      } />

                      <ChatMessage text={
                        `Si t'en as plusieurs, sépare-les avec des virgules.`
                      } />

                      <TextField onChange={handleQuestionChange} id="standard-basic" label="Mets ta question ici" fullWidth />

                      <ContentButtonWrapper>
                        <Button onClick={enableOptions} ariant="contained" disabled={!question}>Soumettre ma question</Button>
                        <Button primary onClick={handleNoQuestion}>Je n'ai pas de questions</Button>
                      </ContentButtonWrapper>
                    </>
                  }

                </AgentSpace>
              }
              {
                videoAdded &&
                <AgentSpace>
                   <ChatMessage text={
                    `Super! J'ai ajouté la vidéo que tu as demandé dans ta table de contenu.`
                  } />
                   <ChatMessage text={
                    `Tu peux continuer ton exploration comme tu veux.`
                  } />
                </AgentSpace>
              }
              {
                noVideoAdded &&
                <AgentSpace>
                   <ChatMessage text={
                    `Ok, tu peux toujours me poser des questions quand tu ouvres une nouvelle vidéo.`
                  } />
                   <ChatMessage text={
                    `Tu peux maintenant continuer ton exploration comme tu veux.`
                  } />
                </AgentSpace>
              }

            </ResizeHorizon>
          </Resize>
        </ResizeVertical>

      </Resize>
    </div>
  </div>
}