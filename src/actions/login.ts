"use server"

import * as z from "zod"

import { loginSchema } from "@/components/forms/login-form"

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
