import { RoomContextProvider } from "../context/RoomContext"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <RoomContextProvider>
      <Component {...pageProps} />
    </RoomContextProvider>
  )
}

export default MyApp
