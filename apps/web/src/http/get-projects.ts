import { api } from './api-client'


interface GetProjectsResponse {
  projects: {
    description: string;
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
    ownerId: string;
    organizationId: string;
    owner: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    };
    createdAt: string;
  }[]
}

export async function getProjects(org: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000))


  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>()

  return result
}