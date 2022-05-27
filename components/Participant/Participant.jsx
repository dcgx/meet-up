import React from "react"
import { useRef, useEffect } from "react"
import clsx from "clsx"

export const Participant = ({
  participant,
  isLocal = false,
  isRemote = false,
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
    <section>
      <video
        className={clsx("w-full", isSharingVideo ? null : "hidden")}
        ref={videoRef}
        autoPlay={true}
      />

      <audio ref={audioRef} autoPlay={true} muted={isSharingAudio} />
    </section>
  )
}

export default Participant
