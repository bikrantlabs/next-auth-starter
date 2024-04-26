"use server"

import bcrypt from "bcryptjs"

import { ErrorTypes } from "@/types/error-types"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/server/get-user"
import { getPasswordResetTokenByToken } from "@/lib/server/password-reset-token"

import { NewPasswordSchema } from "./schema"
import { NewPasswordInputType, NewPasswordReturnType } from "./types"

async function handler(
  data: NewPasswordInputType
): Promise<NewPasswordReturnType> {
  const { token, password } = data
  const existingToken = await getPasswordResetTokenByToken(token)
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
  const user = await getUserByEmail(existingToken.email)
  if (!user) {
    return {
      success: false,
      data: {
        message: "Email not found!",
        type: "error",
      },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      password: hashedPassword,
    },
  })
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })
  return {
    success: true,
    data: {
      message: "Password reset successfully",
      type: "success",
    },
  }
}

export const newPasswordAction = createSafeAction(NewPasswordSchema, handler)
