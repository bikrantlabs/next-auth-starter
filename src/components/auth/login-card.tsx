/* Login Form is used inside login card */
import Link from "next/link"

import { LoginForm } from "../forms/login-form"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const LoginCard = () => {
  return (
    <CardWrapper
      Header={
        <div className="text-4xl font-semibold text-center">Welcome Back!</div>
      }
      Content={<LoginForm />}
      showSocialButtons
      Footer={
        <div className="mx-auto text-sm">
          <Link href="/auth/register">New user? Register</Link>{" "}
        </div>
      }
    />
  )
}
