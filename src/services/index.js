import axios from "axios"

const apiEndpint = "http://localhost:3000"

export const addIdentifiant = async ({identifiant, help}) => {
  const user = await axios.post(`${apiEndpint}/users`, {identifiant, help})
  return user.data

}

export const updateLastURl = async (identifiant, url) => {
  const done = await axios.post(`${apiEndpint}/users-url`, {identifiant, url})
  return done
}

export const addUserInput = async (identifiant, phase, id, data) => {
  console.log({ identifiant })
  const done = await axios.post(`${apiEndpint}/users-input`, {identifiant, phase, id, data})
  return done
}