import { Resend } from "resend"

import { ConfirmEmail } from "./confirm-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
  console.log(`🔥 mail.ts:7 ~ Sending Email to: ~`, email)
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p><a href="${confirmLink}" target="_blank">Click this link to confirm your email</a></p>`,
    react: <ConfirmEmail userFirstname={username} confirmLink={confirmLink} />,
  })
}
