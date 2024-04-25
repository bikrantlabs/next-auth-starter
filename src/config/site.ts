import { SiteConfig } from "@/types/site-config"

export const siteConfig: SiteConfig = {
  name: "Next Entree",
  author: "redpangilinan",
  description:
    "Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: process.env.NEXT_PUBLIC_APP_URL as string,
    author: "https://rdev.pro",
  },
  links: {
    github: "https://github.com/bikrantlabs/next-auth-starter",
  },
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
