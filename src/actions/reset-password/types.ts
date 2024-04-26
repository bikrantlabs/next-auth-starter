import { z } from "zod"

import { AuthMessage } from "@/types/auth-message"
import { ActionState } from "@/lib/create-safe-action"

import {
  NewPasswordSchema,
  PasswordResetSchema,
  VerifyResetTokenSchema,
} from "./schema"

export type PasswordResetInputType = z.infer<typeof PasswordResetSchema>

export type PasswordResetReturnType = ActionState<
  PasswordResetInputType,
  AuthMessage
>
export type VerifyResetTokenInputType = z.infer<typeof VerifyResetTokenSchema>
export type VerifyResetTokenReturnType = ActionState<
  VerifyResetTokenInputType,
  AuthMessage
>

export type NewPasswordInputType = z.infer<typeof NewPasswordSchema>
export type NewPasswordReturnType = ActionState<
  NewPasswordInputType,
  AuthMessage
>
