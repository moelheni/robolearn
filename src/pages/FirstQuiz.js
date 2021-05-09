import React, { useState } from "react"
import { Redirect, useParams } from "react-router";
import TopicQuiz from "../components/TopicQuiz"

import topics from '../data/topics'
import getRandom from "../utils/getRandom";

export default function FirstQuiz() {
  let { id } = useParams();
  const topic = topics[id]
  const [nextTopic, setNextTopic] = useState(null)
  const [endQuiz, setEndQuiz] = useState(false)

  const onFinish = () => {
    const nextTopictoRedirect = Object.keys(topics).reduce((ac, e) => {
      if (ac === 'current') {
        return e
      }
      if (e === id) {
        return 'current'
      }
      return ac
    }, null)

    console.log({nextTopictoRedirect})

    if (nextTopictoRedirect && nextTopic !== 'current') {
      setNextTopic(nextTopictoRedirect)
    } else if (nextTopic === 'current') {
      setEndQuiz(true)
    }
  }


  return <>
    {
      nextTopic && nextTopic !== 'current' &&
      <Redirect to={`/first-quiz/${nextTopic}`} />
    }

    {
      endQuiz &&
      <Redirect to="/end-quiz" />
    }
    <TopicQuiz topic={topic} goNextTopic onFinish={onFinish} />
  </>
}