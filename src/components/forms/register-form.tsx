"use client"

import { useState, useTransition } from "react"
import { LoginActionReturnType } from "@/actions/login"
import { register } from "@/actions/register"
import { registerSchema } from "@/schema/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Callout } from "@/components/ui/callout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [actionResponse, setActionResponse] = useState<LoginActionReturnType>()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setActionResponse(undefined)
    startTransition(() => {
      register(values).then((data) => setActionResponse(data))
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 w-full mb-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="bikrant 14"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
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
            disabled={isPending}
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
          {actionResponse && (
            <Callout
              content={<p>{actionResponse.message}</p>}
              variant={actionResponse.type}
            />
          )}
          <Button
            isLoading={isPending}
            className="mx-auto w-full"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  )
}
