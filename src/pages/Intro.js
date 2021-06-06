import React, { useContext, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import ChatMessage from "../components/ChatMessage"
import { ContentButtonWrapper } from "../components/ContentWrapper"
import { RoboMessage } from "../components/RoboMessage"
import { GifWrapper } from "../components/GifWrapper"
import { Button } from "../components/Button"
import { ReactComponent  as RobotIcon } from '../components/ChatMessage/robot-appli.svg'
import { ButtonWrapper, IntroContainer, Left, Right, RobotPicture } from "./Intro.styled"
import { addIdentifiant } from "../services"
import UserContext from "../context/UserContext"

export default function PreExplorationOutro() {
  const [identifiant, setIdentifiant] = useState('')

  const { user, setUser } = useContext(UserContext)

  const handleChange = e => {
    setIdentifiant(e.target.value)
  }

  const handleIdentifiant = async (e) => {
    e.preventDefault()
    const newUser = await addIdentifiant(identifiant)
    setUser(newUser)
  }
  

  return (
    <>
      {
        user &&
        <Redirect to="/first-quiz/histoire-de-la-science" />
      }
      <IntroContainer>
        <Left>
          <RobotPicture>
            <RobotIcon />
          </RobotPicture>
          <div>
            <h2>IDENTIFIANT</h2>
            <input onChange={handleChange} placeholder="ENTREZ IDENTIFIANT ICI" />
          </div>
        </Left>
        <Right>
          <h1>BIENVENUE SUR <br /> "CURIOUS KIDS"</h1>

          <p>
            dlqsùkdqsùkdùlqmqdlmùsskkllmmkkqqsslmlmddkkqqss
          </p>

          <ButtonWrapper>
            <Link to={`/first-quiz/histoire-de-la-science`}>
              <Button variant="contained" onClick={handleIdentifiant} disabled={!identifiant}>Je commence</Button>
            </Link>
          </ButtonWrapper>
        </Right>
      </IntroContainer>
    </>
  )
}