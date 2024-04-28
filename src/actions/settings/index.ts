"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

import { ErrorTypes } from "@/types/error-types"
import { auth } from "@/lib/auth"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { getUserById } from "@/lib/server/get-user"

import { SettingSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const session = await auth()
  if (!session?.user || !session.user.id) {
    return {
      success: false,
      error: ErrorTypes.Unauthorized,
      data: {
        type: "error",
        message: "Unauthorized",
      },
    }
  }
  const dbUser = await getUserById(session.user.id)
  if (!dbUser) {
    return {
      success: false,
      error: ErrorTypes.Unauthorized,
      data: {
        type: "error",
        message: "Unauthorized",
      },
    }
  }
  // If user is logged in through oauth providers, they cannot modify these fields.
  if (session.user.isOAuth) {
    data.password = undefined
    data.newPassword = undefined
    data.twoFactorEnabled = undefined
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(data.password, dbUser.password)
    if (passwordMatch) {
      const hashedPassword = await bcrypt.hash(data.newPassword, 10)
      data.password = hashedPassword
      data.newPassword = undefined
    } else {
      return {
        success: false,
        error: ErrorTypes.CredentialsIncorrect,
        data: {
          type: "error",
          message: "Incorrect Old Password",
        },
      }
    }
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...data,
    },
  })
  revalidatePath("/auth")
  return {
    success: true,
    data: {
      type: "success",
      message: "Settings Updated!",
    },
  }
}

export const updateSettingAction = createSafeAction(SettingSchema, handler)
