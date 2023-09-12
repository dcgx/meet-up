import React from "react"
import clsx from "clsx"

import { useRoomContext } from "../../context/RoomContext"
import { useVideoCallContext } from "../../context/VideoCallContext"

import { VideoCallFooter } from "."
import LocalParticipant from "../LocalParticipant"
import RemoteParticipant from "../RemoteParticipant"

export const VideoCall = () => {
  const {
    room,
    participants,
    isSharingVideo,
    isSharingAudio,
    isDomainSpeaker,
    initializeRoom,
    toggleAudio,
    toggleVideo,
  } = useRoomContext()

  return (
    <div>
      <section
        className={clsx(
          "bg-zinc-900 p-6 gap-4 ",
          participants.length === 0 && "flex items-center justify-center",
          participants.length > 0 &&
            "grid grid-cols-participants-layout grid-rows-participants-layout justify-center lg:justify-start"
        )}
      >
        <LocalParticipant
          participant={room.localParticipant}
          isSharingVideo={isSharingVideo}
          isSharingAudio={isSharingAudio}
          isDomainSpeaker={isDomainSpeaker}
        />

        {participants.map((participant) => (
          <RemoteParticipant
            key={participant.sid}
            participant={participant}
            isDomainSpeaker={isDomainSpeaker}
          />
        ))}
      </section>

      {/* <VideoCallFooter /> */}
    </div>
  )
}
