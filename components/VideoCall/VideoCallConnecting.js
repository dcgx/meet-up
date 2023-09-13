import React from "react"
import Spinner from "../Spinner"

export const VideoCallConnecting = () => {
  return (
    <section className="bg-zinc-900 flex flex-col justify-center items-center gap-4 text-zinc-50">
      <Spinner className="text-indigo-300" />
      <p className="font-medium text-xl">Contectando...</p>
    </section>
  )
}
