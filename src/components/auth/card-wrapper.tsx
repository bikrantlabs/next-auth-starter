import React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { SocialButtons } from "./social-buttons"

interface CardWrapperProps {
  Header: JSX.Element
  Content: JSX.Element
  Footer?: JSX.Element
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
  Footer,
  Content,
}) => {
  return (
    <Card>
      <CardHeader>{Header}</CardHeader>
      <CardContent>
        {Content}
        {showSocialButtons && <SocialButtons />}
      </CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  )
}
