import React from "react"
import clsx from "clsx"

import { useLocalVideoToggle } from "../../hooks/useLocalToggleVideo"
import { useLocalAudioToggle } from "../../hooks/useLocalToggleAudio"
import { useTime } from "../../hooks/useTime"

import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi"
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs"
import { AiOutlineInfoCircle } from "react-icons/ai"

export const VideoCallFooter = ({ roomName }) => {
  const { toggleVideo, isSharingVideo } = useLocalVideoToggle()
  const { toggleAudio, isSharingAudio } = useLocalAudioToggle()
  const { time } = useTime()

  return (
    <footer className="fixed bottom-0 h-16 w-full" style={{ background: "#202124" }}>
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
            {/* <button
              onClick={() => setShowDropdown(!isShowDropdown)}
              className="bg-zinc-700 p-3 rounded-full mx-2 hover:bg-zinc-600"
            >
              <AiOutlineMore size={22} />
            </button> */}

            {/* {isShowDropdown && (
              <div className="dropdown">
                <ul>
                  <li>Aplicar efectos visuales (Pronto)</li>
                  <li>Configuración (Pronto)</li>
                </ul>
              </div>
            )} */}
          </div>
        </section>
        <section className="flex items-center justify-end">
          {/* <button
            className="p-3 rounded-full mx-2 text-white hover:bg-zinc-800"
            onClick={() => setShowRoomDetails(true)}
          >
            <AiOutlineInfoCircle size={22} />
          </button> */}
        </section>
      </div>
    </footer>
  )
}
