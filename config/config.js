const config = {
  twilio: {
    authToken: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN,
    accountSid: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
    apiKey: process.env.NEXT_PUBLIC_TWILIO_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_TWILIO_API_SECRET,
  },
}

export { config }
