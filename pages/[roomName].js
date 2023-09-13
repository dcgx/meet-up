import Head from "next/head"
import clsx from "clsx"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

import { VideoCallProvider } from "../context/VideoCallContext"
import { useRoomContext } from "../context/RoomContext"
import { useTime } from "../hooks/useTime"

import { BiMicrophone, BiCopy, BiMicrophoneOff } from "react-icons/bi"
import { BsCameraVideoOff, BsCameraVideo } from "react-icons/bs"
import { AiOutlineInfoCircle, AiOutlineClose, AiOutlineMore } from "react-icons/ai"
import LocalParticipant from "../components/LocalParticipant"
import RemoteParticipant from "../components/RemoteParticipant"
import Spinner from "../components/Spinner"
import { VideoCall, VideoCallConnecting } from "../components/VideoCall"
import { useRouter } from "next/router"
import { useConnectVideo } from "../hooks/useConnectVideo"

const RoomDetails = () => {
  const router = useRouter()
  const { roomName } = router.query
  const { loading: loadingVideo } = useConnectVideo(roomName)
  console.log(loadingVideo, "loadingVideo")
  console.log(roomName, "roomName")

  // const [isShowRoomDetails, setShowRoomDetails] = useState(false)
  // const [isShowDropdown, setShowDropdown] = useState(false)
  // const [roomName, setRoomName] = useState(null)
  // const [time] = useTime()

  // const {
  //   room,
  //   participants,
  //   isSharingVideo,
  //   isSharingAudio,
  //   isDomainSpeaker,
  //   initializeRoom,
  //   toggleAudio,
  //   toggleVideo,
  // } = useRoomContext()

  // const handleClickToCopyOnClipboard = () => {
  //   toast("Enlace de la reunión copiado!")
  // }

  // useEffect(() => {
  //   initializeRoom().then(setRoomName)
  // }, [])

  return (
    <VideoCallProvider>
      <Head>
        <title>Talki👾Meet | {roomName || "Contectado..."}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="La plataforma de videoconferencias gratuita" />
      </Head>{" "}
      <main className="grid h-screen">
        {loadingVideo ? <VideoCallConnecting /> : <VideoCall roomName={roomName} />}
        {/* {room ? (
          <VideoCall />
        ) : (
          <section className="bg-zinc-900 flex flex-col justify-center items-center gap-4 text-zinc-50">
            <Spinner className="text-indigo-300" />
            <p className="font-medium text-xl">Contectando...</p>
          </section>
        )} */}

        {/* <footer className="fixed bottom-0 h-16 w-full" style={{ background: "#202124" }}>
          <div className="grid grid-cols-3 h-full text-white">
            <section className="justify-self-start flex items-center gap-4 text-sm font-semibold w-[56px] lg:w-auto">
              <p className="hidden lg:block">{time}</p>
              <div className="hidden lg:block h-4 w-[1px] bg-zinc-50"></div>
              <section className="flex items-center gap-4">
                {roomName ? (
                  <p className="hidden md:block truncate">{roomName}</p>
                ) : (
                  <div className="w-32 h-2 animate-pulse bg-zinc-700 rounded-md" />
                )}
              </section>
            </section>
            <section className="flex items-center justify-center">
              <button
                onClick={toggleAudio}
                className={clsx(
                  "p-3 rounded-full mx-2 ",
                  isSharingAudio ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-700  hover:bg-red-600"
                )}
              >
                {isSharingAudio ? <BiMicrophone size={22} /> : <BiMicrophoneOff size={22} />}
              </button>
              <button
                onClick={toggleVideo}
                className={clsx(
                  "p-3 rounded-full mx-2 ",
                  isSharingVideo ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-700  hover:bg-red-600"
                )}
              >
                {isSharingVideo ? <BsCameraVideo size={22} /> : <BsCameraVideoOff size={22} />}
              </button>
              <div className="dropdown-wrapper">
                <button
                  onClick={() => setShowDropdown(!isShowDropdown)}
                  className="bg-zinc-700 p-3 rounded-full mx-2 hover:bg-zinc-600"
                >
                  <AiOutlineMore size={22} />
                </button>

                {isShowDropdown && (
                  <div className="dropdown">
                    <ul>
                      <li>Aplicar efectos visuales (Pronto)</li>
                      <li>Configuración (Pronto)</li>
                    </ul>
                  </div>
                )}
              </div>
            </section>
            <section className="flex items-center justify-end">
              <button
                className="p-3 rounded-full mx-2 text-white hover:bg-zinc-800"
                onClick={() => setShowRoomDetails(true)}
              >
                <AiOutlineInfoCircle size={22} />
              </button>
            </section>
          </div>
        </footer>
        
        {isShowRoomDetails && (
          <aside className="room-details-aside">
            <div className="p-5">
              <section className="flex justify-between items-center">
                <h3>Detalle de la reunión</h3>
                <button
                  className="p-3 rounded-full  hover:bg-zinc-100"
                  onClick={() => setShowRoomDetails(false)}
                >
                  <AiOutlineClose></AiOutlineClose>
                </button>
              </section>
              <section className="my-5">
                <h4 className="font-medium">Información para unirse</h4>
                <p className="text-gray-500 my-2">https://meet-app.vercel.app/fgg-kscz-trf</p>
                <button
                  onClick={handleClickToCopyOnClipboard}
                  className="rounded flex items-center justify-between font-medium py-3 px-2 text-blue-500 hover:bg-blue-50"
                >
                  <BiCopy size={23} className="mr-3" />
                  <span>Copiar información para unirse</span>
                </button>
              </section>
            </div>
          </aside>
        )} */}
      </main>
      <Toaster />
    </VideoCallProvider>
  )
}

export default RoomDetails
