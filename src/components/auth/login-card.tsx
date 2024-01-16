import { CardWrapper } from "./card-wrapper"

/**
 * A card wrapper for login box
 * @returns JSX.Element
 */
export const LoginCard = () => {
  return (
    <CardWrapper
      Header={
        <div className="text-4xl font-semibold text-center">Welcome Back!</div>
      }
      Content={<div>Render Login Form Here</div>}
      showSocialButtons
      Footer={<div className="mx-auto">New user? Register</div>}
    />
  )
}
