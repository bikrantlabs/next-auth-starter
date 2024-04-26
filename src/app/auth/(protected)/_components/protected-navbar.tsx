"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"

export const ProtectedRouteNavbar = () => {
  const pathname = usePathname()
  console.log()
  return (
    <nav className="bg-card border mb-4 border-border flex-1 flex justify-between items-center p-4 rounded-xl max-w-3xl shadow-sm w-full">
      <div className="flex gap-x-2 w-full">
        <Link href="server">
          <Button variant={pathname.endsWith("server") ? "default" : "outline"}>
            Server
          </Button>
        </Link>
        <Link href="client">
          <Button variant={pathname.endsWith("client") ? "default" : "outline"}>
            Client
          </Button>
        </Link>
        <Link href="admin">
          <Button variant={pathname.endsWith("admin") ? "default" : "outline"}>
            Admin
          </Button>
        </Link>
        <Link href="settings">
          <Button
            variant={pathname.endsWith("settings") ? "default" : "outline"}
          >
            Settings
          </Button>
        </Link>
        <div className="ml-auto" />
        <UserButton />
      </div>
    </nav>
  )
}
