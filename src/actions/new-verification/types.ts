import { z } from "zod"

import { AuthMessage } from "@/types/auth-message"
import { ActionState } from "@/lib/create-safe-action"

import { NewVerificationSchema } from "./schema"

export type InputType = z.infer<typeof NewVerificationSchema>

export type ReturnType = ActionState<InputType, AuthMessage>
