import React from "react"
import { useRef, useEffect } from "react"
import clsx from "clsx"

import styles from "./LocalParticipant.module.css"
import { BsMicMute } from "react-icons/bs"

export const LocalParticipant = ({
  participant,
  isDomainSpeaker,
  isSharingVideo,
  isSharingAudio,
}) => {
  const videoRef = useRef()
  const audioRef = useRef()

  useEffect(() => {
    participant?.tracks.forEach((track) => {
      if (track.kind === "video") {
        track?.track.attach(videoRef.current)
      } else if (track.kind === "audio") {
        track?.track.attach(audioRef.current)
      }
    })
  }, [participant])

  return (
    <section className="relative">
      <section className="absolute text-white right-0 p-5">
        {!isSharingAudio && <BsMicMute stroke={2} size={20} />}
      </section>
      <video
        className={clsx("w-full", isSharingVideo ? null : "hidden")}
        ref={videoRef}
        autoPlay={true}
      />
      <section className="absolute bottom-0 p-5 text-white">
        <p className="text-lg">{participant.identity}</p>
      </section>

      <audio ref={audioRef} autoPlay={true} muted={isSharingAudio} />
    </section>
  )
}

export default LocalParticipant
