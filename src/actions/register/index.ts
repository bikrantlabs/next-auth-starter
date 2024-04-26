"use server"

import { sendVerificationEmail } from "@/emails/mail"
import bcrypt from "bcryptjs"

import { ErrorTypes } from "@/types/error-types"
import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/server/tokens"

import { RegisterSchema } from "./schema"
import { InputType, ReturnType } from "./types"

async function handler(data: InputType): Promise<ReturnType> {
  const { email, password, username } = data

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return {
      error: ErrorTypes.EmailAlreadyExists,
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

  const verificationToken = await generateVerificationToken(email)
  try {
    await sendVerificationEmail(
      username,
      verificationToken.email,
      verificationToken.token
    )
    return {
      data: {
        message: "Verification email sent! Expires in 1 hour",
        type: "success",
      },
      success: true,
    }
  } catch (error) {
    return {
      error: ErrorTypes.VerificationEmailSendError,
      data: {
        message: "Error sending verification token.",
        type: "error",
      },
      success: false,
    }
  }
}

export const registerAction = createSafeAction(RegisterSchema, handler)
