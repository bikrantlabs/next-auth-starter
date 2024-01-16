import React from "react"

import { AuthLayout } from "@/components/auth/layout"
import { LoginCard } from "@/components/auth/login-card"
import { LoginForm } from "@/components/forms/login-form"

function LoginPage() {
  return (
    <AuthLayout>
      {/* <LoginForm /> */}
      <LoginCard />
    </AuthLayout>
  )
}

export default LoginPage
