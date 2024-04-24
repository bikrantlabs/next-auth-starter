"use server"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

import { signIn } from "@/lib/auth"
import { createSafeAction } from "@/lib/create-safe-action"

import { LoginSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { email, password } = data
  console.log(`🔥 index.ts:14 ~ Fired login server action ~`)
  try {
    await signIn("credentials", {
      email,
      password,
      // TODO: implement callbackUrl redirect
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            data: {
              message: "Credentials Incorrect!",
              type: "error",
            },
          }
        default:
          return {
            success: false,
            data: {
              message: "Error Logging in!",
              type: "error",
            },
          }
      }
    }
    throw error
  }
  return {
    data: {
      message: "Successfully logged in",
      type: "success",
    },
  }
}

export const loginAction = createSafeAction(LoginSchema, handler)
