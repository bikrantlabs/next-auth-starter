import { Card, CardContent } from "../ui/card"

export const Features = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-6xl font-semibold drop-shadow-lg">Features</h1>
      <div className="grid grid-cols-3 items-center gap-4 max-w-5xl w-full">
        <FeatureCard title={"Next.js 14"} description="App dir, routing" />
        <FeatureCard
          title={"Shadcn UI"}
          description="Shadcn/ui as UI library and stylings"
        />
        <FeatureCard
          title={"CommitLint"}
          description="Commitlint for enforcing commit conventions"
        />
        <FeatureCard
          title={"CommitLint"}
          description="Commitlint for enforcing commit conventions"
        />
        <FeatureCard
          title={"Release It"}
          description="Commitlint for enforcing commit conventions"
        />
        <FeatureCard
          title={"Authentication"}
          description="Fully fetched authentication includes 2FA, credentials login, oauth and role based authorization"
        />
        <FeatureCard
          title={"Auth.js"}
          description="Auth.js for handling authentications"
        />
        <FeatureCard
          title={"Prisma & PostgreSQL"}
          description="PostgreSQL database with Prisma ORM"
        />
        <FeatureCard title={"Resend"} description="Send emails with resend" />
      </div>
    </div>
  )
}
interface FeatureCardProps {
  title: string
  description: string
}
const FeatureCard = ({ description, title }: FeatureCardProps) => {
  return (
    <Card className="min-h-36 hover:border-border hover:cursor-pointer transition hover:bg-secondary/10">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-secondary">{description}</p>
      </CardContent>
    </Card>
  )
}
