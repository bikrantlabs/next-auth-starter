import { UserRole } from "@prisma/client"
import * as z from "zod"

export const SettingSchema = z
  .object({
    name: z.string().optional(),
    twoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]).optional(),
    password: z
      .string()
      .min(8, {
        message: "Minimum 8 characters required",
      })
      .max(30, {
        message: "Maximum 30 characters allowed",
      })
      .optional(),
    newPassword: z
      .string()
      .min(8, {
        message: "Minimum 8 characters required",
      })
      .max(30, {
        message: "Maximum 30 characters allowed",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }
      return true
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false
      }
      return true
    },
    {
      message: "Old password is required!",
      path: ["password"],
    }
  )
