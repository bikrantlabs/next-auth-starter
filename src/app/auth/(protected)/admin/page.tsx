"use client"

import { auth } from "@/lib/auth"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Callout } from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

const AdminPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">🔑 Admin Page</h1>
      </CardHeader>
      <CardDescription>Only admins have access to this page</CardDescription>
      <CardContent className="mt-2">
        {currentUser?.role === "ADMIN" ? (
          <Callout
            content={<p>You have access to view this content</p>}
            variant="success"
          />
        ) : (
          <Callout
            content={<p>You do not have access to view this content</p>}
            variant="warning"
          />
        )}
      </CardContent>
    </Card>
  )
}

export default AdminPage
