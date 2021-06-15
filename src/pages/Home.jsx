import React, { useContext, useState } from "react"
import { Redirect } from "react-router"
import UserContext from "../context/UserContext"

export default function Home() {
  const [help, setHelp] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const handleChange = (e) => {
    setHelp(e.target.value === '1')
  }

  const { setUser } = useContext(UserContext)

  const done = () => {
    setUser({
      help
    })
    setRedirect(true)
  }

  return <div>
    {
      redirect &&
      <Redirect to="/intro" />
    }
    <select onChange={handleChange}>
      <option value="1">avec assitance</option>
      <option value="0">sans</option>
    </select>
    <button onClick={done}>Go</button>
  </div>
}