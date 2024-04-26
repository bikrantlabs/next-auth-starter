"use server"

import { ErrorTypes } from "@/types/error-types"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/server/get-user"
import { getVerificationTokenByToken } from "@/lib/server/verification-token"

import { NewVerificationSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const existingToken = await getVerificationTokenByToken(data.token)
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
        message: "Email doesnot exist!",
      },
    }
  }
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })
  return {
    success: true,
    data: {
      type: "success",
      message: "Email verified successfully",
    },
  }
}

export const newVerificationAction = createSafeAction(
  NewVerificationSchema,
  handler
)
