"use client"

/* Login Form is used inside login card */
import { useState } from "react"
import Link from "next/link"

import { LoginForm } from "../forms/login-form"
import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const LoginCard = ({ cardClassName }: { cardClassName?: string }) => {
  const [render2FA, setRender2FA] = useState(false)
  return (
    <div className="max-w-[22rem] w-full">
      <CardWrapper
        cardClassName={cardClassName}
        Header={<p>{render2FA ? "Enter 2FA code" : "Welcome Back"}</p>}
        Content={<LoginForm onSuccess={() => setRender2FA(true)} />}
        showSocialButtons
        Footer={
          <div className="mx-auto text-sm">
            <Link href="/auth/register">New user? Register</Link>{" "}
          </div>
        }
      />
    </div>
  )
}
