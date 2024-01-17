"use server"

import { loginSchema } from "@/schema/loginSchema"
import * as z from "zod"

export type LoginActionReturnType = {
  success: boolean
  message: string
  type: "error" | "success" | "warning"
}
export const login = async (
  values: z.infer<typeof loginSchema>
): Promise<LoginActionReturnType> => {
  const validatedSchema = loginSchema.safeParse(values)
  if (!validatedSchema.success) {
    return { success: false, message: "Invalid fields", type: "error" }
  }
  return { success: true, message: "Email sent!", type: "success" }
}
