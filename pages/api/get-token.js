import { videoChatToken } from "../../utils/videoChatToken"
import { generateId } from "../../utils/generateId"

export default function handler(req, res) {
  const sendTokenResponse = (token, room, res) => {
    return res.send(
      JSON.stringify({
        token: token.toJwt(),
        room,
      })
    )
  }

  console.log(req.body, "req.query")
  console.log(req.method, "req.method")

  if (req.method === "GET") {
    const identity = req.query.identity
    const room = generateId()
    if (!identity || !room) {
      return res.status(400).send("Identity and Room required")
    }
    const token = videoChatToken(identity, room)
    sendTokenResponse(token, room, res)
  } else if (req.method === "POST") {
    const identity = req.body.identity
    const room = generateId()
    if (!identity || !room) {
      return res.status(400).send("Identity and Room required")
    }
    const token = videoChatToken(identity, room)
    sendTokenResponse(token, room, res)
  } else if (req.method === "PUT") {
    const identity = req.body.identity
    const room = req.body.room
    console.log({identity, room}, "PUT")
    if (!identity || !room) {
      return res.status(400).send("Identity and Room required")
    }
    const token = videoChatToken(identity, room)
    sendTokenResponse(token, room, res)
  }
}
