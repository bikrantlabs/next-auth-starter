"use client"

import { signOut } from "next-auth/react"

import { Button } from "../ui/button"

/**
 * We cannot directly do `<button onClick={signOut()}>` in a server component, since signOut() function modifies cookies
 *
 * Cookies can only be modified in a Server Action or Route Handler
 *
 * But we can do `<button onClick={signOut()}>` in a client component only if `signOut()` is imported from `next-auth/react`
 */

export const LogoutButton = () => {
  return (
    <Button type="submit" onClick={() => signOut()}>
      Logout
    </Button>
  )
}
