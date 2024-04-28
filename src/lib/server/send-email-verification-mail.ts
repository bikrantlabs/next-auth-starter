import { sendVerificationEmail } from "@/emails/mail"

import { generateVerificationToken } from "./tokens"

export const sendEmailVerificationMail = async ({
  email,
  name,
}: {
  email: string
  name?: string | null
}) => {
  const newVerificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    name || email.split("@")[0],
    newVerificationToken.email,
    newVerificationToken.token
  )
}
