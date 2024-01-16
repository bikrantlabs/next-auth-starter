"use client"

import React from "react"
import { IconBrandGoogleFilled } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export const SocialButtons = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button startIcon={<IconBrandGoogleFilled className="icon-sm" />}>
        <span>Google</span>
      </Button>
    </div>
  )
}
