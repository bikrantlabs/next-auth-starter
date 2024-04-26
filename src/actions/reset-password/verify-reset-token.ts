"use server"

import { ErrorTypes } from "@/types/error-types"
import { createSafeAction } from "@/lib/create-safe-action"
import { getUserByEmail } from "@/lib/server/get-user"
import { getPasswordResetTokenByToken } from "@/lib/server/password-reset-token"

import { VerifyResetTokenSchema } from "./schema"
import { VerifyResetTokenInputType, VerifyResetTokenReturnType } from "./types"

interface T {
  token: string
}
async function handler(
  data: VerifyResetTokenInputType
): Promise<VerifyResetTokenReturnType & Partial<T>> {
  const existingToken = await getPasswordResetTokenByToken(data.token)
  if (!existingToken) {
    return {
      success: false,
      error: ErrorTypes.InvalidToken,
      data: {
        type: "error",
        message: "Invalid Token!",
      },
    }
  }
  const tokenExpired = existingToken.expires <= new Date()
  if (tokenExpired) {
    return {
      success: false,
      error: ErrorTypes.TokenExpired,
      data: {
        type: "error",
        message: "Token expired!",
      },
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return {
      success: false,
      error: ErrorTypes.EmailNotRegistered,
      data: {
        type: "error",
        message: "Email does not exist!",
      },
    }
  }

  return {
    success: true,
    error: ErrorTypes.CredentialsIncorrect,
    data: {
      type: "success",
      message: "Enter new password",
    },
    token: "ss",
  }
}

export const verifyPasswordResetTokenAction = createSafeAction(
  VerifyResetTokenSchema,
  handler
)
