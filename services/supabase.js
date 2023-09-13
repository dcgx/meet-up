import { supabase } from "./config"

export const signInWithProvider = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    })
    if (error) throw new Error("An error ocurred during authentication")
    return data
  } catch (err) {
    console.log(err)
  }
}

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error("An error ocurred during logout")
  } catch (error) {
    console.error(error)
  }
}
