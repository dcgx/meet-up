import { useState, useEffect } from "react"
import { createLocalTracks, connect } from "twilio-video"

export function useRoom() {
  const [token, setToken] = useState(null)
  const [localTracks, setLocalTracks] = useState([])
  const [participants, setParticipants] = useState([])

  const [room, setRoom] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSharingVideo, setSharingVideo] = useState(false)
  const [isSharingAudio, setSharingAudio] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem("room.token"))
  }, [])

  useEffect(() => {
    const udpateParticipants = () => setParticipants(Array.from(room.participants.values()))

    if (room) {
      room.participants.forEach(udpateParticipants)
      room.on("participantConnected", (participant) => {
        udpateParticipants()
        Notification(`${participant.identity} se ha unido a la sala`)
      })
      room.on("participantDisconnected", (participant) => {
        udpateParticipants()
        Notification(`${participant.identity} se ha salido de la sala`)
      })

      room.on("trackPublished", udpateParticipants)
      room.on("trackUnpublished", udpateParticipants)
      room.on("disconnected", () => {
        toast.success("Has salido de la sala")
      })
      room.on("dominantSpeakerChanged", (participant) => {
        setDomainSpeaker(participant?.identity === room.localParticipant.identity)
      })

      return () => {
        room.off("participantConnected", udpateParticipants)
        room.off("participantDisconnected", udpateParticipants)
        room.off("trackPublished", udpateParticipants)
        room.off("trackUnpublished", udpateParticipants)
      }
    }
  }, [room])
  const initializeRoom = async () => {
    setLoading(true)

    const tracks = await createLocalTracks({
      audio: { facingMode: "user" },
      video: { facingMode: "user" },
    }).catch(() => {})

    console.log({ tracks })

    if (!token) {
      setLoading(false)
      throw new Error("Hubo un problema al conectarte a la sala.")
    }

    const roomId = localStorage.getItem("room.id")

    console.log({ roomId })
    console.log({ token })

    const videoRoom = await connect(token, {
      dominantSpeaker: true,
      name: roomId,
      video: !!tracks,
      audio: !!tracks,
      tracks,
    }).catch((err) => {
      console.log({ err })
    })

    console.log({ videoRoom })
    setSharingVideo(!!tracks)
    setSharingAudio(!!tracks)
    !!tracks && setLocalTracks(tracks)
    setRoom(videoRoom)
    setLoading(false)

    return Promise.resolve(roomId)
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

    localStorage.setItem("room.id", roomId)
    localStorage.setItem("room.token", token)

    setLoading(false)
    setToken(token)

    return Promise.resolve(roomId)
  }

  const joinRoom = () => {}

  return {
    room,
    participants,
    isLoading,
    initializeRoom,
    createRoom,
    joinRoom,
  }
}
