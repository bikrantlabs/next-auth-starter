import { db } from "@/lib/db"

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    })
    return verificationToken
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.twoFactorToken.findFirst({
      where: {
        token,
      },
    })
    return verificationToken
  } catch (error) {
    return null
  }
}
