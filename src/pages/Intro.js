import React from "react"
import { Link } from "react-router-dom"
import ChatMessage from "../components/ChatMessage"
import { ContentButtonWrapper } from "../components/ContentWrapper"
import { RoboMessage } from "../components/RoboMessage"
import { GifWrapper } from "../components/GifWrapper"
import { Button } from "../components/Button"

export default function PreExplorationOutro() {

  return <RoboMessage>
    <ChatMessage
        big
        text="Bonjour, moi c'est Toto et aujourd'hui on va faire quelques activités ensemble. On va découvrir de nouvelles choses et pouvoir poser autant de question qu'on veut.Dis-moi quand t'es pret et on va commencer !" />
     <GifWrapper >
      <img src="/robot-danse-2-transparent.gif" />
    </GifWrapper>
    <ContentButtonWrapper>
      <Link to={`/first-quiz/histoire-de-la-science`}>
        <Button variant="contained">Je commence</Button>
      </Link>
    </ContentButtonWrapper>
  </RoboMessage>
}