import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"

import { getVerificationTokenByEmail } from "./verification-token"

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 10 * 1000) // Milliseconds in 1 hour

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const newVerificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return newVerificationToken
}
