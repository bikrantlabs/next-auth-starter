"use client"

import React from "react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export const SocialButtons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        startIcon={<IconBrandGoogleFilled className="icon-sm" />}
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      />
      <Button
        startIcon={<IconBrandGithub className="icon-sm" />}
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      />
    </div>
  )
}
