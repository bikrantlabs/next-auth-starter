"use client"

import { auth } from "@/lib/auth"
import { useCurrentUser } from "@/hooks/use-current-user"
import { AuthLayout } from "@/components/auth/layout"

import { ProtectedRouteNavbar } from "../_components/protected-navbar"

const AuthSettingPage = () => {
  const currentUser = useCurrentUser()
  return (
    <AuthLayout>
      <div>Hello</div>
    </AuthLayout>
  )
}

export default AuthSettingPage
