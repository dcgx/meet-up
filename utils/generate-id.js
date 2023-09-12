import { customAlphabet } from "nanoid"

export function generateId() {
  const randomPart1 = generateRandomString(3) 
  const randomPart2 = generateRandomString(4) 
  const randomPart3 = generateRandomString(3)

  return `${randomPart1}-${randomPart2}-${randomPart3}`
}

function generateRandomString(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length)
    result += alphabet.charAt(randomIndex)
  }

  return result
}
