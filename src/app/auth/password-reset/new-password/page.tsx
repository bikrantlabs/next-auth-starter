"use client"

import { useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { verifyPasswordResetTokenAction } from "@/actions/reset-password/verify-reset-token"

import { useAction } from "@/hooks/use-action"
import { AuthLayout } from "@/components/auth/layout"
import { NewPasswordCard } from "@/components/auth/new-password-card"

const NewPasswordPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const { data, execute, success, isLoading } = useAction(
    verifyPasswordResetTokenAction
  )
  const onSubmit = useCallback(() => {
    execute({ token: token || "1" })
    console.log(`🔥 new-verification-form.tsx:15 ~ Token ~`, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  console.log(`🔥 page.tsx:21 ~ Success ~`, success, data, isLoading)
  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <AuthLayout>
      <NewPasswordCard
        tokenValid={success}
        token={token || "1"}
        isLoading={!data?.message}
      />
    </AuthLayout>
  )
}

export default NewPasswordPage
