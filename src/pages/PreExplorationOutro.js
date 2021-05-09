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
      <img src="/robot-danse-3-transparent.gif" />
    </GifWrapper>
    <ChatMessage
        big
        text="Super travail, on peut maintenant commencer l'exploration si tu es pret(e) !" />
    <ContentButtonWrapper>
      <Link to={`/exploration/${id}`}>
        <Button variant="contained">Je commence</Button>
      </Link>
    </ContentButtonWrapper>
  </div>
}