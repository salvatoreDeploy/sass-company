'use client'

import { Label } from '@/components/ui/label'
import { singinInWithEmailAndPassword } from './actions'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import githubIcon from '@/app/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormEvent, useState, useTransition } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/navigation'
import { signInWithGithub } from '../action'

export function SignInForm() {
  /* 
    const [{ success, message, errors }, formAction, isPending] = useActionState(
    singinInWithEmailAndPassword,
    { success: false, message: null, errors: null }
    ) 
  */

  const router = useRouter()

  const [{ success, errors, message }, handleSubmit, isPending] = useFormState(
    singinInWithEmailAndPassword,
    () => {
      router.push('/')
    }
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sing in failed</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="text" id="email" />

          {errors?.email && (
            <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
              <AlertTriangle className="size-3" />
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
              <AlertTriangle className="size-3" />
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="w-full">
          <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
          Sigin in with GitHub
        </Button>
      </form>
    </div>
  )
}
