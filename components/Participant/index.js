import { useRef } from "react"
import { useParticipant } from "../../hooks/useParticipant"
import clsx from "clsx"

function Participant({ participant, speaking }) {
  const videoRef = useRef()
  const audioRef = useRef()
  console.log(participant, "participant")
  console.log(speaking, "participant")

  useParticipant({
    participant,
    videoRef,
    audioRef,
  })
  
  return (
    <div
      className={clsx(
        "bg-zinc-800 rounded-lg aspect-video overflow-hidden relative group border border-zinc-800 min-w-full",
        false && "shadow-lg shadow-emerald-600"
      )}
    >
      {speaking && "speaking"}
      <video autoPlay={true} ref={videoRef} />
      <audio autoPlay={true} ref={audioRef} />
      <p>{participant.identity}</p>
    </div>
  )
}
export { Participant }
