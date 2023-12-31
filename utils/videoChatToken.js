import twilio from 'twilio'
import { config } from '../config/config'
const AccessToken = twilio.jwt.AccessToken
const { VideoGrant, ChatGrant } = AccessToken
const serviceSid = config.chatSid

const generateToken = () => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  )
}

const videoChatToken = (identity, room, config) => {
  let videoGrant
  const chatGrant = new ChatGrant({ serviceSid })
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room })
  } else {
    videoGrant = new VideoGrant()
  }
  const token = generateToken(config)
  token.addGrant(videoGrant)
  token.addGrant(chatGrant)
  token.identity = identity
  return token
}

export { videoChatToken }
