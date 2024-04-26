"use server"

import { sendTwoFactorEmail, sendVerificationEmail } from "@/emails/mail"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

import { ErrorTypes } from "@/types/error-types"
import { signIn } from "@/lib/auth"
import { createSafeAction } from "@/lib/create-safe-action"
import { getUserByEmail } from "@/lib/server/get-user"
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/server/tokens"
import { getVerificationTokenByEmail } from "@/lib/server/verification-token"

import { LoginSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { email, password } = data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      success: false,
      error: ErrorTypes.CredentialsIncorrect,
      data: {
        message: "Invalid Credentials",
        type: "error",
      },
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await getVerificationTokenByEmail(email)

    if (verificationToken) {
      const tokenExpired = verificationToken.expires <= new Date()
      if (tokenExpired) {
        const newVerificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(
          existingUser.name || email.split("@")[0],
          newVerificationToken.email,
          newVerificationToken.token
        )
        return {
          success: false,
          error: ErrorTypes.EmailNotVerified,
          data: {
            message:
              "Confirmation email sent. Please check your inbox!  Expires in 1 hour",
            type: "success",
          },
        }
      } else {
        return {
          success: false,
          error: ErrorTypes.EmailNotVerified,
          data: {
            message: "Please check our inbox and verify your email!",
            type: "warning",
          },
        }
      }
    } else {
      const newVerificationToken = await generateVerificationToken(email)
      await sendVerificationEmail(
        existingUser.name || email.split("@")[0],
        newVerificationToken.email,
        newVerificationToken.token
      )

      return {
        success: false,
        error: ErrorTypes.EmailNotVerified,
        data: {
          message:
            "Confirmation email sent. Please check your inbox!  Expires in 1 hour",
          type: "success",
        },
      }
    }
  }

  if (existingUser.twoFactorEnabled && existingUser.email) {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    await sendTwoFactorEmail(
      existingUser.name || twoFactorToken.email.split("@")[0],
      twoFactorToken.email,
      twoFactorToken.token
    )
    return {
      success: true,
      data: {
        twoFactor: true,
        message: "Two factor code sent!",
        type: "success",
      },
    }
  }

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
    success: true,
    data: {
      message: "Successfully logged in",
      type: "success",
    },
  }
}

export const loginAction = createSafeAction(LoginSchema, handler)
