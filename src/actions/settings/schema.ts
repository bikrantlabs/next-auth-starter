import * as z from "zod"

export const SettingSchema = z.object({
  name: z.string().optional(),
})
