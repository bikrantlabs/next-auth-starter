import { ProtectedRouteNavbar } from "./_components/protected-navbar"

const ProtectedRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col -mt-24 items-center justify-center w-full">
      <ProtectedRouteNavbar />
      {children}
    </div>
  )
}

export default ProtectedRoutesLayout
