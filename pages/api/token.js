// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import AccessToken, { VideoGrant } from "twilio/lib/jwt/AccessToken"
import { generateId } from "../../utils/generate-id"

export default function handler(req, res) {
  let { username, roomId = null } = req.body
  const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET } = process.env

  const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET)
  if (req.method === "POST") {
    roomId = generateId()
  }

  let videoGrant = new VideoGrant({ room: roomId })

  token.addGrant(videoGrant)
  token.identity = username

  res.status(200).json([token?.toJwt(), roomId])
}
