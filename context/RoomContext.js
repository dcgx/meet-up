import { createContext, useContext } from "react"
import { useRoom } from "../hooks/useRoom"

const RoomContext = createContext(null)

export const RoomContextProvider = ({ children }) => {
  const room = useRoom()

  return <RoomContext.Provider value={{ ...room }}>{children}</RoomContext.Provider>
}

export const useRoomContext = () => {
  const context = useContext(RoomContext)
  if (context === null) {
    throw new Error("useRoomContext must be used within a RoomProvider")
  }
  return context
}
