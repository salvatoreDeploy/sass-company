import { api } from './api-client'


interface GetMeProfileResponse {
  me: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  }
}


export async function getProfile() {
  const result = await api
    .get('me')
    .json<GetMeProfileResponse>()

  return result
}
