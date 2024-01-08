import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">Auth</h1>
        <p className="text-lg">Authentication service</p>
        <div>
          <LoginButton>
            <Button>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
