'use server'

import { signWithEmailAndPassword } from '@/http/sign-in-with-email-and-password'

export async function singinInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const result = await signWithEmailAndPassword({
    email: String(email),
    password: String(password),
  })

  console.log(result)
}
