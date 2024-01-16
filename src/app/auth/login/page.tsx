import React from "react"

import { AuthLayout } from "@/components/auth/layout"
import { LoginForm } from "@/components/forms/login-form"

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
