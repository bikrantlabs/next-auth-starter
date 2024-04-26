import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { SessionProvider } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
