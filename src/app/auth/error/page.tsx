import { ErrorCard } from "@/components/auth/error-card"
import { AuthLayout } from "@/components/auth/layout"

const AuthErrorPage = () => {
  return (
    <AuthLayout>
      <ErrorCard />
    </AuthLayout>
  )
}

export default AuthErrorPage
