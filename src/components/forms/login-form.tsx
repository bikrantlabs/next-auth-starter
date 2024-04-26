"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"

interface LoginFormProps {
  onSuccess: () => void
}
export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const params = useSearchParams()
  const [code, setCode] = useState("")
  const { data, isLoading, execute } = useAction(loginAction)
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values)
  }
  useEffect(() => {
    data?.twoFactor && onSuccess()
  }, [data?.twoFactor, onSuccess])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {data?.twoFactor ? (
          <>
            <div className="space-y-4 w-full mb-4 mx-auto flex flex-col items-center justify-center">
              <div>
                <InputOTP
                  className="items-center justify-center hidden"
                  maxLength={6}
                  value={code}
                  onChange={(_code) => setCode(_code)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                isLoading={isLoading}
                className="mx-auto w-full"
                type="submit"
              >
                Confirm
              </Button>
            </div>
          </>
        ) : (
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
            <Link href="/auth/password-reset">
              <Button
                className="p-0 font-normal"
                size="sm"
                variant="link"
                type="button"
              >
                Forget Password?
              </Button>
            </Link>
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
        )}
      </form>
    </Form>
  )
}
