import { useState } from "react"

export function useVideoCall() {
  const [isSharingVideo, setSharingVideo] = useState(false)
  const [isSharingAudio, setSharingAudio] = useState(false)
  const [isDomainSpeaker, setDomainSpeaker] = useState(null)
  
  return {
    isDomainSpeaker,
    isSharingVideo,
    isSharingAudio,
  }
}
