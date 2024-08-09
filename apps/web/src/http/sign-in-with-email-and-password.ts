import { api } from './api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signWithEmailAndPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post('session/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
