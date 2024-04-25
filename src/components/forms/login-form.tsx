"use client"

import { useParams, useSearchParams } from "next/navigation"
import { loginAction } from "@/actions/login"
import { LoginSchema } from "@/actions/login/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Callout } from "../ui/callout"

export const LoginForm = () => {
  const params = useSearchParams()

  const { data, fieldErrors, isLoading, execute } = useAction(loginAction)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 w-full mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {data && (
            <Callout content={<p>{data.message}</p>} variant={data.type} />
          )}
          {params.get("error") === "OAuthAccountNotLinked" && !data && (
            <Callout
              content={<p>You are aleady registered from another provider</p>}
              variant={"error"}
            />
          )}
          <Button
            isLoading={isLoading}
            className="mx-auto w-full"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
