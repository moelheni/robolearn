import React, { useContext, useEffect, useState } from "react"
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

  useEffect(() => {
    window.localStorage.removeItem('user')
  }, [])

  const handleIdentifiant = async (e) => {
    e.preventDefault()
    const newUser = await addIdentifiant({
      identifiant,
      help: user.help
    })
    setUser({
      ...newUser,
      identified: true
    })
  }

  return (
    <>
      {
        user.identified &&
        <Redirect to={user.url || "/first-quiz/histoire-de-la-science"} />
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
          <h1>BIENVENUE SUR <br /> "KIDS ASK"</h1>

          <p style={{ fontSize: "1.4em", maxWidth: '500px', margin: 'auto' }}>
            JE M'APPELLE "CHATTY" ET AUJOURD'HUI, ON VA FAIRE DES ACTIVITES ENSEMBLE. <br /> <br />
            TOUT D'ABORD, ON VA COMMENCER AVEC UN QUIZ GENERAL. <br /> <br />
            QUAND TU ES PRET(E) CLIQUE SUR LE BUTTON "JE COMMENCE".
          </p>

          <ButtonWrapper>
            <Link to={`/first-quiz/histoire-de-la-science`}>
              <Button variant="contained" onClick={handleIdentifiant} disabled={!identifiant}>JE COMMENCE</Button>
            </Link>
          </ButtonWrapper>
        </Right>
      </IntroContainer>
    </>
  )
}
