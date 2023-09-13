import { useState } from "react"

export function useVideoCall() {
  const [isSharingVideo, setSharingVideo] = useState(false)
  const [isSharingAudio, setSharingAudio] = useState(false)

  return {
    isSharingVideo,
    isSharingAudio,
    setSharingAudio,
    setSharingVideo,
  }
}
