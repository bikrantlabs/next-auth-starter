"use server"

import bcrypt from "bcryptjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

import { RegisterSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { email, password, username } = data
  console.log(`🔥 index.ts:13 ~ Data: ~`, email, password, username)
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })
  console.log(`🔥 index.ts:19 ~ Fired Register Action... ~`)
  if (existingUser) {
    return {
      data: {
        message: "Email already taken",
        type: "error",
      },
      success: false,
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  })

  // TODO: Send verification email

  return {
    data: {
      message: "Registered Successfully",
      type: "success",
    },
  }
}

export const registerAction = createSafeAction(RegisterSchema, handler)
