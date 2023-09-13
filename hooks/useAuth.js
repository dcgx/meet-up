import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { supabase } from "../services/config"
import { signInWithProvider } from "../services/supabase"

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setAuthenticated] = useState(true)
  const [currentUser, setCurrentUser] = useState()
  const [session, setSession] = useState()

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      if (event === "SIGNED_IN") {
        setSession(session)
        setCurrentUser(session.user)
        setAuthenticated(true)
        router.push("/home")
      }
      if (event === "SIGNED_OUT") {
        router.push("/auth/login")
      }
    })

    // async function setAuthCookie(event, session) {
    //   await fetch("/api/auth", {
    //     method: "POST",
    //     headers: new Headers({ "Content-Type": "application/json" }),
    //     credentials: "same-origin",
    //     body: JSON.stringify({ event, session }),
    //   })
    // }}

    console.log(authListener, "authListener")

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    session,
    getCurrentUser: async () => await supabase.auth.getUser(),
    isAuthenticated,
    signInWithProvider,
  }
}
