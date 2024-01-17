import Link from "next/link"

import { RegisterForm } from "../forms/register-form"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for register box
 * @returns JSX.Element
 */
export const RegisterCard = () => {
  return (
    <CardWrapper
      Header={
        <div className="text-4xl font-semibold text-center">Welcome human</div>
      }
      Content={<RegisterForm />}
      showSocialButtons
      Footer={
        <div className="mx-auto text-sm">
          <Link href="/auth/login">Already registered? Login</Link>{" "}
        </div>
      }
    />
  )
}
