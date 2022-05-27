import Head from "next/head"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRoomContext } from "../../context/RoomContext"

const RoomDetails = () => {
  const [roomName, setRoomName] = useState(null)
  const { room, participants, initializeRoom } = useRoomContext()

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
            <h3>Local: {room.localParticipant.identity}</h3>

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
