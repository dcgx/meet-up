import twilio from "twilio"
import { config } from "../../../config/config"
import { generateId } from "../../../utils/generateId"

const AccessToken = twilio.jwt.AccessToken
const { VideoGrant, ChatGrant } = AccessToken
// const serviceSid = config.chatSid

const generateToken = () => {
  return new AccessToken(config.twilio.accountSid, config.twilio.apiKey, config.twilio.apiSecret)
}

export default async function handler(req, res) {
  try {
    let videoGrant
    let room

    const identity = req.body.identity

    if (req.method === "POST") {
      room = generateId()
    } else if (req.method === "PUT") {
      room = req.query?.room || req.body?.room
    }
    console.log({ identity, room })

    if (!identity || !room) {
      return res.status(400).send("Identity and Room required")
    }

    // TODO: Pendiente cuando se implement chat
    // const chatGrant = new ChatGrant({ serviceSid })
    if (typeof room !== "undefined") {
      videoGrant = new VideoGrant({ room })
    } else {
      videoGrant = new VideoGrant()
    }

    const token = generateToken(config)
    token.addGrant(videoGrant)
    // TODO: Pendiente cuando se implement chat
    // token.addGrant(chatGrant)
    token.identity = identity

    return res.send(
      JSON.stringify({
        token: token.toJwt(),
        room,
      })
    )
  } catch (error) {
    console.error("Error al generar el token:", error)
    res.status(500).json({ error: "Error al generar el token" })
  }
}
