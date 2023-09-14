import { useState } from "react"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { RoomContextProvider } from "../context/RoomContext"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RoomContextProvider>
        <Component {...pageProps} />
      </RoomContextProvider>
    </SessionContextProvider>
  )
}

export default MyApp
