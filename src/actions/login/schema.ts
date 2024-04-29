import * as z from "zod"

export const LoginSchema = z.object({
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
  code: z.string().optional(),
  callbackUrl: z.string().optional(),
})
