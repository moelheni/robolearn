import React from "react"
import { Link, useParams } from "react-router-dom"
import ChatMessage from "../components/ChatMessage"
import { ContentButtonWrapper } from "../components/ContentWrapper"
import { GifWrapper } from "../components/GifWrapper"
import { Button } from "../components/Button"

export default function PreExplorationOutro() {
  let { id } = useParams();

  return <div>
    <GifWrapper >
      <img src="/robot-danse-4-transparent.gif" />
    </GifWrapper>
    <ChatMessage
        big
        text="T'as presque fini! Avant de te dire au revoir, on va reprendre le quiz rapidement pour voir si on a appris de nouvelles choses. !" />
    <ContentButtonWrapper>
      <Link to={`/spe-quiz/${id}/finished`}>
        <Button variant="contained">Je commence</Button>
      </Link>
    </ContentButtonWrapper>
  </div>
}