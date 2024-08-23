import { api } from './api-client'

interface SignInWithGithubRequest {
  githubCode: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({ githubCode }: SignInWithGithubRequest) {
  const result = await api
    .post('session/github', {
      json: {
        githubCode,
      },
    })
    .json<SignInWithGithubResponse>()

  return result
}
