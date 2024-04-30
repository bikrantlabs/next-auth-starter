"use client"

import { updateSettingAction } from "@/actions/settings"
import { SettingSchema } from "@/actions/settings/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useAction } from "@/hooks/use-action"
import { useCurrentUser } from "@/hooks/use-current-user"

import { Button } from "../ui/button"
import { Callout } from "../ui/callout"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"

export const SettingsForm = () => {
  const user = useCurrentUser()
  const { update } = useSession()
  const { data, execute, isLoading } = useAction(updateSettingAction, {
    onSuccess() {
      update()
    },
  })
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      twoFactorEnabled: user?.twoFactorEnabled || false,
      role: user?.role || UserRole.USER,
      newPassword: undefined,
      password: undefined,
    },
  })
  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    execute(values)
  }
  return (
    <>
      <Callout
        variant="warning"
        content={<p>Email updating feature isn&apos;t available yet.</p>}
      />
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user?.isOAuth && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </>
            )}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {!user?.isOAuth && (
              <FormField
                control={form.control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-input p-3 shadow-sm">
                    <div className="space-y-0 5">
                      <FormLabel>Enable Two Factor Authentication</FormLabel>
                      <FormDescription>
                        Enable two factor authentication to your account for an
                        extra layer of security
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isLoading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button isLoading={isLoading} type="submit">
            Save
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        {data && (
          <Callout variant={data.type} content={<p>{data.message}</p>} />
        )}
      </div>
    </>
  )
}
