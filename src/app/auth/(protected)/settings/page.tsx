import { auth } from "@/lib/auth"

const AuthSettingPage = async () => {
  const session = await auth()
  return (
    <div className="p-16">
      AuthSettingPage
      <div>
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}

export default AuthSettingPage
