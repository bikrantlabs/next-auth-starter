import { auth } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

const ProtectedServerPage = async () => {
  const session = await auth()
  console.log(`🔥 page.tsx:11 ~ Session ~`, session)
  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">🗄️ Server Page</h1>
      </CardHeader>
      <CardDescription>
        This page is being rendered in the server and data fetching happens in
        server.
      </CardDescription>
      <CardContent>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}

export default ProtectedServerPage
