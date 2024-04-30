import { SiteConfig } from "@/types/site-config"

export const siteConfig: SiteConfig = {
  name: "Next Auth Starter",
  author: "bikrantjung",
  description:
    "Next.js 14+ starter template with fully fetched authentication.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
    "shadcn/ui",
    "next-auth",
  ],
  url: {
    base: process.env.NEXT_PUBLIC_APP_URL as string,
    author: "https://github.com/bikrantlabs",
  },
  links: {
    github: "https://github.com/bikrantlabs/next-auth-starter",
  },
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
