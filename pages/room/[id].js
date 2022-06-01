import Head from "next/head"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import Participant from "../../components/Participant/Participant"
import { useRoomContext } from "../../context/RoomContext"
import {
  BiMicrophone,
  BiMicrophoneOff,
  BsCameraVideo,
  BsCameraVideoOff,
  GrCircleInformation,
} from "react-icons/all"
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
      <main className="grid h-screen">
        {room ? (
          <section className="grid-participants">
            <Participant
              participant={room.localParticipant}
              isSharingAudio={isSharingAudio}
              isSharingVideo={isSharingVideo}
              isDomainSpeaker={isDomainSpeaker}
            />

            <Participant
              participant={room.localParticipant}
              isSharingAudio={isSharingAudio}
              isSharingVideo={isSharingVideo}
              isDomainSpeaker={isDomainSpeaker}
            />

            <Participant
              participant={room.localParticipant}
              isSharingAudio={isSharingAudio}
              isSharingVideo={isSharingVideo}
              isDomainSpeaker={isDomainSpeaker}
            />

            {/* {participants.map((participant) => (
              <p>- {participant.identity}</p>
            ))} */}
          </section>
        ) : (
          <section>conecntando...</section>
        )}

        <footer className="fixed bottom-0 h-16 w-full" style={{ background: "#202124" }}>
          <div className="grid grid-cols-3 h-full text-white">
            <section className=" flex items-center mx-4">
              <h4 className="text-lg font-medium">uzc-mcxx-yez</h4>
            </section>
            <section className="flex items-center justify-center">
              <button className="bg-zinc-700 p-3 rounded-full mx-2 hover:bg-zinc-600">
                <BiMicrophone size={22} />
              </button>
              <button className="bg-red-700 p-3 rounded-full mx-2 hover:bg-red-600">
                <BsCameraVideoOff size={22} />
              </button>
            </section>
            <section className="flex items-center justify-end">
              <button className="p-3 rounded-full mx-2 hover:bg-zinc-800">
                <GrCircleInformation size={22} />
              </button>
            </section>
          </div>
        </footer>
      </main>

      <Toaster />
    </>
  )
}

export default RoomDetails
