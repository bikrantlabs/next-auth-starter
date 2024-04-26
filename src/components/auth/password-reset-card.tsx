/* Login Form is used inside login card */
import Link from "next/link"

import { LoginForm } from "../forms/login-form"
import { PasswordResetForm } from "../forms/password-reset-form"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const PasswordResetCard = () => {
  return (
    <div className="max-w-[22rem] w-full">
      <CardWrapper
        Header={<p>Reset your password</p>}
        Content={<PasswordResetForm />}
        Footer={
          <div className="mx-auto text-sm">
            <Link href="/auth/login">Back to login</Link>{" "}
          </div>
        }
      />
    </div>
  )
}
