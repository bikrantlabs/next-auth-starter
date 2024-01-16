"use client"

import React from "react"
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export const SocialButtons = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        startIcon={<IconBrandGoogleFilled className="icon-sm" />}
        className="w-full"
        variant="outline"
      />
      <Button
        startIcon={<IconBrandGithub className="icon-sm" />}
        className="w-full"
        variant="outline"
      />
    </div>
  )
}
