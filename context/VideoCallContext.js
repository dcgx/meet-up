import { createContext } from "react"
import { useVideoCall } from "../hooks/useVideoCall"

const VideoCallContext = createContext()

export const VideoCallProvider = ({ children }) => {
  const videoCall = useVideoCall()

  return <VideoCallContext.Provider value={{ ...videoCall }}>{children}</VideoCallContext.Provider>
}

export const useVideoCallContext = () => {
  const context = useContext(VideoCallContext)
  if (context === null) {
    throw new Error("useVideoCallContext must be used within a VideoCallContext")
  }
  return context
}
