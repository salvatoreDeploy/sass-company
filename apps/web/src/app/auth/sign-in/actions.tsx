'use server'

import { signWithEmailAndPassword } from '@/http/sign-in-with-email-and-password'
import { HTTPError } from 'ky'
import { z } from 'zod'
import { cookies } from 'next/headers'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please, provide valid e-mail address' }),
  password: z.string().min(1, { message: 'Please, provide your password' }),
})

interface KyResponseJson {
  message: any
}

export async function singinInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signWithEmailAndPassword({
      email: String(email),
      password: String(password),
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<KyResponseJson>()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
