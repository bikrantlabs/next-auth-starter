"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

const ProtectedClientPage = () => {
  const user = useCurrentUser()
  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">🖥 Client Page</h1>
      </CardHeader>
      <CardDescription>
        This page is being rendered in the client and data fetching happens in
        the client
      </CardDescription>
      <CardContent>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}

export default ProtectedClientPage
