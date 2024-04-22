"use server"

import { revalidatePath } from "next/cache"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { LoginSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  return {
    data: {
      message: "Successfully logged in",
      type: "success",
    },
  }
}

export const loginAction = createSafeAction(LoginSchema, handler)
