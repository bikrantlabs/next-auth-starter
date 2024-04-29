"use server"

import { sendResetPasswordEmail } from "@/emails/mail"

import { createSafeAction } from "@/lib/create-safe-action"
import { getUserByEmail } from "@/lib/server/get-user"
import { generatePasswordResetToken } from "@/lib/server/tokens"

import { PasswordResetSchema } from "./schema"
import { PasswordResetInputType, PasswordResetReturnType } from "./types"

async function handler(
  data: PasswordResetInputType
): Promise<PasswordResetReturnType> {
  const { email } = data
  const user = await getUserByEmail(email)

  if (!user) {
    return {
      success: false,
      data: {
        message: "Email not found!",
        type: "error",
      },
    }
  }
  if (!user.emailVerified) {
    return {
      success: false,
      data: {
        message: "Email not verified. Please verify your email first.",
        type: "error",
      },
    }
  }
  if (!user.password) {
    return {
      success: false,
      data: {
        message: "Cannot reset password for OAuth providers",
        type: "error",
      },
    }
  }
  const token = await generatePasswordResetToken(email)
  await sendResetPasswordEmail(
    user.name || token.email.split("@")[0],
    token.email,
    token.token
  )
  return {
    success: true,
    data: {
      message: "Password reset link sent! Expires in 10 minutes",
      type: "success",
    },
  }
}

export const sendPasswordResetLinkAction = createSafeAction(
  PasswordResetSchema,
  handler
)
