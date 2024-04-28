import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { SettingsForm } from "@/components/forms/settings-form"

const AuthSettingPage = () => {
  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="text-4xl font-semibold text-center">⚙️ Settings Page</h1>
      </CardHeader>
      <CardDescription>Settings page for your user account</CardDescription>
      <CardContent className="mt-2">
        <SettingsForm />
      </CardContent>
    </Card>
  )
}

export default AuthSettingPage
