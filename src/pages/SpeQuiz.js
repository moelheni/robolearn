import React, { useState } from "react"
import { Redirect, useParams } from "react-router";
import TopicQuiz from "../components/TopicQuiz"

import topics from '../data/topics'

export default function SpeQuiz() {
  let { id, exploration } = useParams();
  console.log({exploration})
  const topic = topics[id]

  const [endQuiz, setEndQuiz] = useState(false)

  const onFinish = () => {
    setEndQuiz(true)
  }

  return <>
    {
      endQuiz &&
      <Redirect to={`/pre-exploration-outro/${id}`} />
    }
    {
      endQuiz && exploration === 'finished' &&
      <Redirect to={`/post-exploration-finished/${id}`} />
    }
    <TopicQuiz topic={topic} onFinish={onFinish} />
  </>
}