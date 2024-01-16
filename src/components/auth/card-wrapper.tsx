import React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { SocialButtons } from "./social-buttons"

interface CardWrapperProps {
  Header: JSX.Element
  Content: JSX.Element
  showSocialButtons?: boolean
}
/**
 * A card wrapper component for sign in, login, password reset,
 *
 * and other auth components
 *
 */
export const CardWrapper: React.FC<CardWrapperProps> = ({
  Header,
  showSocialButtons = false,
  Content,
}) => {
  return (
    <Card>
      <CardHeader>{Header}</CardHeader>
      <CardContent>{Content}</CardContent>
      {showSocialButtons && <SocialButtons />}
    </Card>
  )
}
