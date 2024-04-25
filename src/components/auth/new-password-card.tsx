/* Login Form is used inside login card */
import Link from "next/link"
import { BeatLoader } from "react-spinners"

import { NewPasswordForm } from "../forms/new-password-form"
import { Callout } from "../ui/callout"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const NewPasswordCard = ({
  tokenValid,
  token,
  isLoading,
}: {
  tokenValid: boolean
  token: string
  isLoading: boolean
}) => {
  return (
    <div className="max-w-[22rem] w-full">
      <CardWrapper
        Header={<p>Set new password</p>}
        Content={
          isLoading ? (
            <div className="flex items-center justify-center w-full">
              <BeatLoader className="my-8" color="white" />
            </div>
          ) : tokenValid ? (
            <NewPasswordForm token={token} />
          ) : (
            <Callout variant="error" content={<p>Invalid Token</p>} />
          )
        }
        Footer={
          <div className="mx-auto text-sm">
            <Link href="/auth/login">Back to login</Link>{" "}
          </div>
        }
      />
    </div>
  )
}
