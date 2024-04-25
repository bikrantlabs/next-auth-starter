/* Login Form is used inside login card */
import Link from "next/link"

import { Button } from "../ui/button"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const ErrorCard = () => {
  return (
    <div className="max-w-sm">
      <CardWrapper
        Header={<div className="text-4xl font-semibold text-center">Opps!</div>}
        Content={<div>Something went wrong, please try again</div>}
        showSocialButtons={false}
        Footer={
          <div className="mx-auto text-sm">
            <Link href="/auth/login">
              <Button variant="ghost">Back to login</Button>
            </Link>
          </div>
        }
      />
    </div>
  )
}
