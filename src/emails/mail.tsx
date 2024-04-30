import { Resend } from "resend"

import { ResetPasswordEmail } from "./reset-password"
import { TwoFactorEmail } from "./two-factor-mail"
import { VerificationEmail } from "./verification-email"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendVerificationEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
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
  const resetPasswordLink = `${domain}/auth/password-reset/new-password?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: (
      <ResetPasswordEmail
        userFirstname={username}
        resetPasswordLink={resetPasswordLink}
      />
    ),
  })
}
export const sendTwoFactorEmail = async (
  username: string,
  email: string,
  code: string
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    react: <TwoFactorEmail twoFactorCode={code} />,
  })
}
