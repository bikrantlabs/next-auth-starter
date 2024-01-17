"use server"

import { registerSchema } from "@/schema/registerSchema"
import * as z from "zod"

export type LoginActionReturnType = {
  success: boolean
  message: string
  type: "error" | "success" | "warning"
}
export const register = async (
  values: z.infer<typeof registerSchema>
): Promise<LoginActionReturnType> => {
  const validatedSchema = registerSchema.safeParse(values)
  if (!validatedSchema.success) {
    return { success: false, message: "Invalid fields", type: "error" }
  }
  return { success: true, message: "Email sent!", type: "success" }
}
