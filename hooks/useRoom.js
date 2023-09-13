import { useState, useEffect } from "react"
import { createLocalTracks, connect } from "twilio-video"
import toast from "react-hot-toast"

const DEBOUNCE_TIMEOUT = 320
const MIN_ROOM_NAME_LENGTH = 16

export function useRoom() {
  const [token, setToken] = useState(null)
  const [localTracks, setLocalTracks] = useState([])
  const [participants, setParticipants] = useState([])

  const [room, setRoom] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSharingVideo, setSharingVideo] = useState(false)
  const [isSharingAudio, setSharingAudio] = useState(false)
  const [isDomainSpeaker, setDomainSpeaker] = useState(null)
  const [dominantSpeaker, setDominantSpeaker] = useState([])

  // useEffect(() => {
  //   setToken(localStorage.getItem("room.token"))
  // }, [])

  // useEffect(() => {
  //   const udpateParticipants = () => setParticipants(Array.from(room.participants.values()))

  //   if (room) {
  //     room.participants.forEach(udpateParticipants)
  //     room.on("participantConnected", (participant) => {
  //       udpateParticipants()
  //       toast(`${participant.identity} se ha unido a la sala`)
  //     })
  //     room.on("participantDisconnected", (participant) => {
  //       udpateParticipants()
  //       toast(`${participant.identity} se ha salido de la sala`)
  //     })

  //     room.on("trackPublished", udpateParticipants)
  //     room.on("trackUnpublished", udpateParticipants)
  //     room.on("disconnected", () => {
  //       toast.success("Has salido de la sala")
  //     })
  //     room.on("dominantSpeakerChanged", (participant) => {
  //       setDomainSpeaker(participant?.identity === room.localParticipant.identity)
  //     })

  //     return () => {
  //       room.off("participantConnected", udpateParticipants)
  //       room.off("participantDisconnected", udpateParticipants)
  //       room.off("trackPublished", udpateParticipants)
  //       room.off("trackUnpublished", udpateParticipants)
  //     }
  //   }
  // }, [room])

  const initializeRoom = async () => {
    setLoading(true)

    const tracks = await createLocalTracks({
      audio: { facingMode: "user" },
      video: { facingMode: "user" },
    }).catch(() => {})

    const token = localStorage.getItem("room.token")
    if (!token) {
      setLoading(false)
      throw new Error("Hubo un problema al conectarte a la sala.")
    }

    const roomId = localStorage.getItem("room.id")

    const videoRoom = await connect(token, {
      dominantSpeaker: true,
      name: roomId,
      video: !!tracks,
      audio: !!tracks,
      tracks,
    }).catch((err) => {
      console.log({ err })
    })

    setSharingVideo(!!tracks)
    setSharingAudio(!!tracks)
    !!tracks && setLocalTracks(tracks)
    setRoom(videoRoom)
    setLoading(false)

    return Promise.resolve(roomId)
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

    console.log(data, "data")

    const { token, room } = data

    setLoading(false)
    setToken(token)

    return Promise.resolve(room)
  }

  const joinRoom = async ({ username, roomId }) => {
    setLoading(true)
    console.log({ username, roomId })
    if (roomId === "" || roomId.length < 12) {
      setLoading(false)
      throw new Error(
        "No se encontró la sala a la que intentas unirte. Por favor, verifica el nombre de la sala  y vuelve a intentarlo."
      )
    }

    let countOfParticipants = participants.length

    const data = await fetch("/api/get-token", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identity: username, room: roomId }),
    }).then((res) => res.json())

    console.log(data, "data")
    const { token } = data

    localStorage.setItem("room.id", roomId)
    localStorage.setItem("room.token", token)

    setLoading(false)
    setToken(token)

    return Promise.resolve(roomId)
  }

  const toggleVideo = async () => {
    if (localTracks?.length === 0) {
      const tracks = await Video.createLocalTracks({
        audio: { facingMode: "user" },
        video: { facingMode: "user" },
      }).catch(() => {})
      setLocalTracks(tracks)
      return
    }

    const track = localTracks.find((track) => track.kind === "video")

    if (track.isEnabled) {
      track.disable()
      setSharingVideo(false)
      room.localParticipant.unpublishTrack(track)
    } else {
      track.enable()
      setSharingVideo(true)
      room.localParticipant.publishTrack(track)
    }
  }

  const toggleAudio = () => {
    if (localTracks?.length === 0) return

    const track = localTracks.find((track) => track.kind === "audio")

    if (track.isEnabled) {
      track.disable()
      setSharingAudio(false)
      room.localParticipant.unpublishTrack(track)
    } else {
      track.enable()
      setSharingAudio(true)
      room.localParticipant.publishTrack(track)
    }
  }

  return {
    room,
    token,
    participants,
    isLoading,
    isSharingVideo,
    isSharingAudio,
    dominantSpeaker,
    setParticipants,
    setRoom,
    setDominantSpeaker,
    initializeRoom,
    createRoom,
    joinRoom,
    toggleVideo,
    toggleAudio,
  }
}
