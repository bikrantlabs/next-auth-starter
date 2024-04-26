import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"

import { getPasswordResetTokenByEmail } from "./password-reset-token"
import { getTwoFactorTokenByEmail } from "./two-factor-token"
import { getVerificationTokenByEmail } from "./verification-token"

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // Milliseconds in 1 hour

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
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 360 * 1000) // Milliseconds in 10 minutes

  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const newPasswordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return newPasswordResetToken
}
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString() // equals to 100000
  const expires = new Date(new Date().getTime() + 360 * 1000) // Milliseconds in 10 minutes

  const existingToken = await getTwoFactorTokenByEmail(email)
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const newTwoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return newTwoFactorToken
}
