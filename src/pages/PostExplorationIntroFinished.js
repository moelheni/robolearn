import React from "react"
import ChatMessage from "../components/ChatMessage"
import { GifWrapper } from "../components/GifWrapper"
import { RoboMessage } from "../components/RoboMessage"

export default function PreExplorationIntro() {

  return <RoboMessage>
    <GifWrapper>
      <img src="/robot-danse-5-transparent.gif" />
    </GifWrapper>
    <ChatMessage
        big
        text="Merci pour avoir fait ces activités avec moi. J'espère que tu les as appréciés comme moi. Bye-Bye !" />

  </RoboMessage>
}