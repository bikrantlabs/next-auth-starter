import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"

export default async function Home() {
  const session = await auth()
  console.log(`🔥 page.tsx:7 ~ Session ~`, session)
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">Auth</h1>
        <p className="text-lg">Authentication service</p>
        <div>
          {session?.user ? (
            /**
             * We cannot directly do `<button onClick={signOut()}>`, since signOut() function modifies cookies
             *
             * Cookies can only be modified in a Server Action or Route Handler
             */
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <LoginButton>
              <Button>Sign in</Button>
            </LoginButton>
          )}
        </div>
      </div>
    </main>
  )
}
