import Head from "next/head"
import React from "react"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"

import { VideoCallProvider } from "../context/VideoCallContext"
import { VideoCall, VideoCallConnecting } from "../components/VideoCall"
import { useConnectVideo } from "../hooks/useConnectVideo"

const RoomDetails = () => {
  const router = useRouter()
  const { roomName } = router.query
  const { loading: loadingVideo } = useConnectVideo(roomName)

  const handleClickToCopyOnClipboard = () => {
    toast("Enlace de la reunión copiado! (PENDIENTE)")
  }

  return (
    <VideoCallProvider>
      <Head>
        <title>Talki👾Meet | {roomName || "Contectado..."}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="La plataforma de videoconferencias gratuita" />
      </Head>{" "}
      <main className="grid h-screen">
        {loadingVideo ? <VideoCallConnecting /> : <VideoCall roomName={roomName} />}
      </main>
      <Toaster />
    </VideoCallProvider>
  )
}

export default RoomDetails
