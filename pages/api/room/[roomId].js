import twilio from "twilio"
import jwt from "jsonwebtoken"
import { config } from "../../../config/config"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed") // Solo se permite el método GET
  }
  const { roomId } = req.query
  try {
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1])
    if (!decodedToken) {
      return res.status(401).end("Token no válido")
    }
    const client = twilio(config.twilio.accountSid, config.twilio.authToken)
    const room = await client.video.rooms(roomId).fetch()
    return res.status(200).json({ room })
  } catch (err) {
    console.log(err)
    res.status(500).end("Room not found")
  }
}
