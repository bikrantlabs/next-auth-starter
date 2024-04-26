import { z } from "zod"

import { AuthMessage } from "@/types/auth-message"
import { ActionState } from "@/lib/create-safe-action"

import { SettingSchema } from "./schema"

export type InputType = z.infer<typeof SettingSchema>

export type ReturnType = ActionState<InputType, AuthMessage>
