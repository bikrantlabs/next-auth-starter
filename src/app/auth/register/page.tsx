import { AuthLayout } from "@/components/auth/layout"
import { RegisterCard } from "@/components/auth/register-card"

function RegisterPage() {
  return (
    <AuthLayout>
      {/* <LoginForm /> */}
      <RegisterCard />
    </AuthLayout>
  )
}

export default RegisterPage
