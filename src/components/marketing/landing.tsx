import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export const LandingSection = () => {
  return (
    <main className="flex h-full flex-col items-center min-h-screen">
      <div className="space-y-6 flex mt-16 items-center justify-center flex-col max-w-4xl">
        <h1 className="text-6xl font-semibold drop-shadow-lg">
          A Next.js 14 bootstrap project
        </h1>
        <p className="text-xl text-secondary-text text-center">
          I am building a Next.js 14 project which contains all base
          configurations and can be extended for developing other projects.
        </p>
        <div className="flex gap-x-2">
          <Link href={siteConfig.links.github} target="_blank">
            <Button
              variant={"outline"}
              className="border-2"
              startIcon={<Icons.github className="h-5 w-5 stroke-[1.5]" />}
            >
              Github
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
