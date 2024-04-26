import * as z from "zod"

export const PasswordResetSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(1),
})

export const VerifyResetTokenSchema = z.object({
  token: z.string().min(1),
})

export const NewPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, {
      message: "Minimum 8 characters required",
    })
    .max(30, {
      message: "Maximum 30 characters allowed",
    }),
})
