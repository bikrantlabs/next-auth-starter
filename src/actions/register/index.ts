"use server"

import { revalidatePath } from "next/cache"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { RegisterSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  return {
    data: {
      message: "Successfully registered",
      type: "success",
    },
  }
}

export const registerAction = createSafeAction(RegisterSchema, handler)
