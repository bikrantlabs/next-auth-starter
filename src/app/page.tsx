import Link from "next/link"

import { siteConfig } from "@/config/site"
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"
import { Icons } from "@/components/icons"
import { Features } from "@/components/marketing/features"
import { LandingSection } from "@/components/marketing/landing"
import { Navbar } from "@/components/navbar"

export default async function Home() {
  const session = await auth()
  return (
    <>
      <LandingSection />
      <Features />
    </>
  )
}
