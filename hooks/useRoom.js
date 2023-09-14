import { useState } from "react"

const DEBOUNCE_TIMEOUT = 320
const MIN_ROOM_NAME_LENGTH = 11
const VALIDATE_ROOM_NAME_REGEX = /^[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+$/

export function useRoom() {
  const [token, setToken] = useState(null)
  const [participants, setParticipants] = useState([])

  const [room, setRoom] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [dominantSpeaker, setDominantSpeaker] = useState([])

  const isValidRoomName = (roomName) => {
    return (
      roomName.length >= MIN_ROOM_NAME_LENGTH &&
      VALIDATE_ROOM_NAME_REGEX.test(roomName)
    )
  }

  const createRoom = async ({ username }) => {
    setLoading(true)
    const data = await fetch("/api/get-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identity: username }),
    }).then((res) => res.json())

    const { token, room } = data

    setLoading(false)
    setToken(token)
    return Promise.resolve(room)
  }

  const joinRoom = async ({ username, roomId }) => {
    setLoading(true)
    if (roomId === "" || roomId.length < 12) {
      setLoading(false)
      throw new Error(
        "No se encontró la sala a la que intentas unirte. Por favor, verifica el nombre de la sala  y vuelve a intentarlo."
      )
    }
    const data = await fetch("/api/get-token", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identity: username, room: roomId }),
    }).then((res) => res.json())

    const { token } = data

    setLoading(false)
    setToken(token)

    return Promise.resolve(roomId)
  }

  return {
    room,
    token,
    participants,
    dominantSpeaker,
    isLoading,
    isValidRoomName,
    setParticipants,
    setRoom,
    setDominantSpeaker,
    createRoom,
    joinRoom,
  }
}
