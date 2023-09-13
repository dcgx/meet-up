import { useState, useEffect } from "react"
import { trackMapToTrack } from "../utils/trackMapToTrack"

function useParticipant({ participant, videoRef, audioRef }) {
  const [videoTracks, setVideoTracks] = useState([])
  const [audioTracks, setAudioTracks] = useState([])

  useEffect(() => {
    setVideoTracks(trackMapToTrack(participant.videoTracks))
    setAudioTracks(trackMapToTrack(participant.audioTracks))

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => {
          return [...videoTracks, track]
        })
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => {
          return [...audioTracks, track]
        })
      }
    }

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track))
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track))
      }
    }
    participant.on("trackSubscribed", trackSubscribed)
    participant.on("disconect", trackUnsubscribed)
  }, [participant])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTracks, videoRef])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioTrack) {
      audioTrack.attach(audioRef.current)
      return () => {
        audioTrack.detach()
      }
    }
  }, [audioTracks, audioRef])
}

export { useParticipant }
