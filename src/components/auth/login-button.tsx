"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { LoginCard } from "./login-card"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    console.log("LoginButton Clicked!")
    router.push("/auth/login")
  }
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="mx-auto flex items-center justify-center">
          <LoginCard cardClassName="border-0" />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
