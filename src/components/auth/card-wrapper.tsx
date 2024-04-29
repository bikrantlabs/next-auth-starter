import React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { SocialButtons } from "./social-buttons"

interface CardWrapperProps {
  Header: JSX.Element
  Content: JSX.Element
  Footer?: JSX.Element
  cardClassName?: string
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
  cardClassName,
}) => {
  return (
    <Card className={cn(cardClassName)}>
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">
          🔏 Authentication
        </h1>
        <h2 className="text-center text-secondary text-lg">{Header}</h2>
      </CardHeader>
      <CardContent>
        {Content}
        {showSocialButtons && <SocialButtons />}
      </CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  )
}
