"use client"

import { newPasswordAction } from "@/actions/reset-password/new-password"
import { NewPasswordSchema } from "@/actions/reset-password/schema"
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

export const NewPasswordForm = ({ token }: { token: string }) => {
  const { data, isLoading, execute } = useAction(newPasswordAction)
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      token,
    },
  })
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute({
      password: values.password,
      token,
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 w-full mb-4">
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

          <Button
            isLoading={isLoading}
            className="mx-auto w-full"
            type="submit"
          >
            Update password
          </Button>
        </div>
      </form>
    </Form>
  )
}
