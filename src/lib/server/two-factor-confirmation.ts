import { db } from "@/lib/db"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const verificationToken = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    })
    return verificationToken
  } catch (error) {
    return null
  }
}
