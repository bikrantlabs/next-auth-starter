"use server"

import { revalidatePath } from "next/cache"

import { ErrorTypes } from "@/types/error-types"
import { auth } from "@/lib/auth"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { SettingSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const session = await auth()
  if (!session?.user) {
    return {
      success: false,
      error: ErrorTypes.Unauthorized,
      data: {
        type: "error",
        message: "Unauthorized",
      },
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
  revalidatePath("/auth/server")
  return {
    success: true,
    data: {
      type: "success",
      message: "Settings updated",
    },
  }
}

export const updateSettingAction = createSafeAction(SettingSchema, handler)
