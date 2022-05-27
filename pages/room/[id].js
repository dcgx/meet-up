import Head from "next/head"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import Participant from "../../components/Participant/Participant"
import { useRoomContext } from "../../context/RoomContext"

const RoomDetails = () => {
  const [roomName, setRoomName] = useState(null)
  const { room, participants, isSharingVideo, isSharingAudio, isDomainSpeaker, initializeRoom } =
    useRoomContext()

  useEffect(() => {
    initializeRoom().then(setRoomName)
    console.log({ room }, "room")
  }, [])

  return (
    <>
      <Head></Head>
      <main>
        {room ? (
          <section>
            <Participant
              participant={room.localParticipant}
              isSharingAudio={isSharingAudio}
              isSharingVideo={isSharingVideo}
              isDomainSpeaker={isDomainSpeaker}
            />

            {participants.map((participant) => (
              <p>- {participant.identity}</p>
            ))}
          </section>
        ) : (
          <section>conecntando...</section>
        )}
      </main>

      <Toaster />
    </>
  )
}

export default RoomDetails
