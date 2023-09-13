import { useCallback, useState } from "react"
import { useRoomContext } from "../context/RoomContext"
import { useVideoCallContext } from "../context/VideoCallContext"

function useLocalVideoToggle() {
  const { room } = useRoomContext()
  const { setSharingVideo } = useVideoCallContext()
  const [isOpen, setIsOpen] = useState(true)
  const localParticipant = room?.localParticipant ?? undefined

  const toggleVideo = useCallback(() => {
    if (localParticipant) {
      if (isOpen) {
        localParticipant.videoTracks.forEach((track) => {
          track.track.disable()
          setIsOpen(false)
          setSharingVideo(false)
        })
      } else {
        localParticipant.videoTracks.forEach((track) => {
          track.track.enable()
          setIsOpen(true)
          setSharingVideo(true)
        })
      }
    }
  }, [localParticipant, isOpen])

  return { toggleVideo, isSharingVideo: isOpen }
}

export { useLocalVideoToggle }
