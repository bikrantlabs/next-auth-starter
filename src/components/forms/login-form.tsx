"use client"

import { useState, useTransition } from "react"
import { login, LoginActionReturnType } from "@/actions/login"
import { loginSchema } from "@/schema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  const [isPending, startTransition] = useTransition()
  const [actionResponse, setActionResponse] = useState<LoginActionReturnType>()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setActionResponse(undefined)
    startTransition(() => {
      login(values).then((data) => setActionResponse(data))
    })
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
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
