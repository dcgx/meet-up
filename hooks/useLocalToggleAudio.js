import { useCallback, useState } from "react"
import { useRoomContext } from "../context/RoomContext"
import { useVideoCallContext } from "../context/VideoCallContext"

function useLocalAudioToggle() {
  const { room } = useRoomContext()
  const { setSharingAudio } = useVideoCallContext()
  const [isOpen, setIsOpen] = useState(true)
  const localParticipant = room?.localParticipant ?? undefined

  const toggleAudio = useCallback(() => {
    if (localParticipant) {
      if (isOpen) {
        localParticipant.audioTracks.forEach((track) => {
          track.track.disable()
          setIsOpen(false)
          setSharingAudio(false)
        })
      } else {
        localParticipant.audioTracks.forEach((track) => {
          track.track.enable()
          setIsOpen(true)
          setSharingAudio
        })
      }
    }
  }, [localParticipant, isOpen])

  return { toggleAudio, isSharingAudio: isOpen }
}

export { useLocalAudioToggle }
