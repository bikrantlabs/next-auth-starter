"use client"

import { useCallback, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { newVerificationAction } from "@/actions/new-verification"
import { BeatLoader } from "react-spinners"

import { useAction } from "@/hooks/use-action"

import { CardWrapper } from "../auth/card-wrapper"
import { Button } from "../ui/button"
import { Callout } from "../ui/callout"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const { data, execute } = useAction(newVerificationAction)

  const onSubmit = useCallback(() => {
    execute({ token: token || "1" })
    console.log(`🔥 new-verification-form.tsx:15 ~ Token ~`, token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      Header={<p>Confirming your verification</p>}
      Content={
        <div className="flex flex-col items-center">
          {data ? (
            <Callout content={<p>{data.message}</p>} variant={data.type} />
          ) : (
            <BeatLoader className="my-8" color="white" />
          )}
          <Link href="/auth/login" className="mt-4">
            <Button variant="ghost">Back to login</Button>
          </Link>
        </div>
      }
    />
  )
}
