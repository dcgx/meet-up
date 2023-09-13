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
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      {/* {speaking && "speaking"} */}
      <video className="object-cover rounded-xl w-full h-full" autoPlay={true} ref={videoRef} />
      <audio autoPlay={true} ref={audioRef} />
      <p className="absolute bottom-3 left-3 m-0 p-0 text-white">{participant.identity}</p>
    </div>
  )
}
export { Participant }
