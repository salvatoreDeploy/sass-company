import { api } from './api-client'


interface GetOrganizationResponse {
  organizations: {
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
  }[]
}

export async function getOrganizaation() {
  const result = await api
    .get('organizations')
    .json<GetOrganizationResponse>()

  return result
}