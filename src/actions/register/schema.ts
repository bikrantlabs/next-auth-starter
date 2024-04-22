import * as z from "zod"

export const RegisterSchema = z.object({
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
  username: z
    .string()
    .min(3, {
      message: "Minimum 3 characters allowed",
    })
    .max(15, {
      message: "Maximum 15 characters allowed",
    }),
})
