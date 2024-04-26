"use client"

import { PasswordResetSchema } from "@/actions/reset-password/schema"
import { sendPasswordResetLinkAction } from "@/actions/reset-password/send-reset-link"
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

export const PasswordResetForm = () => {
  const { data, isLoading, execute } = useAction(sendPasswordResetLinkAction)
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  })
  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
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

          {data && (
            <Callout content={<p>{data.message}</p>} variant={data.type} />
          )}

          <Button
            isLoading={isLoading}
            className="mx-auto w-full"
            type="submit"
          >
            Send reset link
          </Button>
        </div>
      </form>
    </Form>
  )
}
