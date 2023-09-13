import React from "react"
import clsx from "clsx"

import { useRoomContext } from "../../context/RoomContext"

import { Participant } from "../Participant"
import { VideoCallFooter } from "."

export const VideoCall = ({ roomName }) => {
  const { room, participants, dominantSpeaker } = useRoomContext()
  return (
    <div>
      <section
        className={clsx(
          "bg-zinc-900 p-6 gap-4 ",
          participants.length === 0 && "h-[calc(100vh-70px)] p-5 grid place-content-center",
          participants.length > 0 &&
            `relative h-[calc(100vh-70px)] p-5 grid gap-5 grid-cols-${2} content-center justify-center`
        )}
      >
        {room?.localParticipant.state === "connected" && (
          <Participant participant={room.localParticipant} speaking={false} />
        )}

        {participants.length > 0 &&
          participants.map((participant) => {
            return (
              <Participant
                participant={participant}
                key={participant.sid}
                speaking={dominantSpeaker?.sid === participant.sid}
              />
            )
          })}
      </section>
      <VideoCallFooter roomName={roomName} />
    </div>
  )
}
