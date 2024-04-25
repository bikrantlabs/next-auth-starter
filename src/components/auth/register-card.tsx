import Link from "next/link"

import { RegisterForm } from "../forms/register-form"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for register box
 * @returns JSX.Element
 */
export const RegisterCard = () => {
  return (
    <div className="max-w-[22rem] w-full">
      <CardWrapper
        Header={<p>Welcome</p>}
        Content={<RegisterForm />}
        showSocialButtons
        Footer={
          <div className="mx-auto text-sm">
            <Link href="/auth/login">Already registered? Login</Link>{" "}
          </div>
        }
      />
    </div>
  )
}
