"use client"

import { signOut } from "next-auth/react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "@/components/auth/logout-button"
import { Icons } from "@/components/icons"

export const UserButton = () => {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              user?.image ||
              "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_15.png"
            }
          />
          <AvatarFallback>
            <Icons.user className="stroke-[1.5] h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
