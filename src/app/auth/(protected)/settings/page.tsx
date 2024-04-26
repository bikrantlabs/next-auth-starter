"use client"

import { updateSettingAction } from "@/actions/settings"
import { useSession } from "next-auth/react"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { Callout } from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

const AuthSettingPage = () => {
  const { update } = useSession()
  const { data, execute, isLoading } = useAction(updateSettingAction, {
    onSuccess() {
      update()
    },
  })
  const onClick = () => {
    execute({
      name: "Kaluwar",
    })
    update()
  }
  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">⚙️ Settings Page</h1>
      </CardHeader>
      <CardDescription>Settings page for your user account</CardDescription>
      <CardContent className="mt-2">
        <Button onClick={onClick} isLoading={isLoading} disabled={isLoading}>
          Update Name!
        </Button>
        {data && (
          <Callout content={<p>{data.message}</p>} variant={data.type} />
        )}
      </CardContent>
    </Card>
  )
}

export default AuthSettingPage
