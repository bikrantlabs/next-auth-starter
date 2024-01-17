import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Minimum 8 characters required",
    })
    .max(30, {
      message: "Maximum 30 characters allowed",
    }),
})
