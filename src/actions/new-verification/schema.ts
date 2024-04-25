import * as z from "zod"

export const NewVerificationSchema = z.object({
  token: z.string().min(1),
})
