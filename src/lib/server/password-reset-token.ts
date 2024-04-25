import { db } from "@/lib/db"

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    })
    return verificationToken
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
    })
    return verificationToken
  } catch (error) {
    return null
  }
}
