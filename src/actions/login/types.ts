import { z } from "zod"

import { AuthMessage } from "@/types/auth-message"
import { ActionState } from "@/lib/create-safe-action"

import { LoginSchema } from "./schema"

export type InputType = z.infer<typeof LoginSchema>
type LoginOutput = {
  twoFactor: boolean
}
export type ReturnType = ActionState<
  InputType,
  AuthMessage & Partial<LoginOutput>
>
