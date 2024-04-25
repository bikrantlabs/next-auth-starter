import { Resend } from "resend"

import { ResetPasswordEmail } from "./reset-password"
import { VerificationEmail } from "./verification-email"

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
    react: (
      <VerificationEmail userFirstname={username} confirmLink={confirmLink} />
    ),
  })
}
export const sendResetPasswordEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const resetPasswordLink = `http://localhost:3000/auth/password-reset/new-password?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: (
      <ResetPasswordEmail
        userFirstname={username}
        resetPasswordLink={resetPasswordLink}
      />
    ),
  })
}
