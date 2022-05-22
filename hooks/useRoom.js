import { useState } from "react"
import Video from "twilio-video"

export function useRoom() {
  const [token, setToken] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const initializeRoom = () => {
    setLoading(true)

    const tracks = Video.createLocalTracks({
      audio: { facingMode: "user" },
      video: { facingMode: "user" },
    }).catch(() => {})

    if (!token) {
      setLoading(false)
      throw new Error("Hubo un problema al conectarte a la sala.")
    }
  }

  const createRoom = async ({ username }) => {
    setLoading(true)

    const data = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then((res) => res.json())

    const [token, roomId] = data

    setLoading(false)
    setToken(token)

    return Promise.resolve(roomId)
  }

  const joinRoom = () => {}

  return {
    isLoading,
    createRoom,
    joinRoom,
  }
}
