import React from "react"

import { Card, CardHeader } from "@/components/ui/card"

import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const LoginCard = () => {
  return (
    <CardWrapper
      Header={
        <div className="text-4xl font-semibold text-center">Card Header</div>
      }
      Content={<div>Content!</div>}
      showSocialButtons
    />
  )
}
