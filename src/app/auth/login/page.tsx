import { AuthLayout } from "@/components/auth/layout"
import { LoginCard } from "@/components/auth/login-card"

function LoginPage() {
  return (
    <AuthLayout>
      {/* Login Form is used inside login card */}
      <LoginCard />
    </AuthLayout>
  )
}

export default LoginPage
