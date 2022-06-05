import Head from "next/head"
import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import Participant from "../../components/Participant/Participant"
import { useRoomContext } from "../../context/RoomContext"
import { BiMicrophone, BiCopy } from "react-icons/bi"
import { BsCameraVideoOff } from "react-icons/bs"
import { AiOutlineInfoCircle, AiOutlineClose, AiOutlineMore } from "react-icons/ai"
import clsx from "clsx"
const RoomDetails = () => {
  const [isShowRoomDetails, setShowRoomDetails] = useState(false)
  const [isShowDropdown, setShowDropdown] = useState(false)
  const [roomName, setRoomName] = useState(null)
  const { room, participants, isSharingVideo, isSharingAudio, isDomainSpeaker, initializeRoom } =
    useRoomContext()

  const handleClickToCopyOnClipboard = () => {
    toast("Enlace de la reunión copiado!")
  }

  useEffect(() => {
    initializeRoom().then(setRoomName)
    console.log({ room }, "room")
  }, [])

  return (
    <>
      <Head></Head>
      <main className="grid h-screen">
        {room ? (
          <section
            style={{ background: "#202124" }}
            className={clsx(
              participants.length === 0 && "flex items-center justify-center",
              participants.length > 0 && "grid-participants"
            )}
          >
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
                      <li>Aplicar efectos visuales</li>
                      <li>Configuración</li>
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
        )}
      </main>

      <Toaster />
    </>
  )
}

export default RoomDetails
