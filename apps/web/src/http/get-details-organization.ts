import { api } from './api-client'


interface GetDetailsOrganizationResponse {
  organization: {
    id: string;
    name: string;
    slug: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
  }
}

export async function getDetailsOrganization(org: string) {
  const result = await api
    .get(`organizations/${org}/details`)
    .json<GetDetailsOrganizationResponse>()

  return result
}