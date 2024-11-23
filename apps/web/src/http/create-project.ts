import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string | null
}

type CreateProjectResponse = void

export async function createProject({
  name,
  description,
  org
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api
    .post(`organization/${org}/project`, {
      json: {
        name,
        description
      },
    })
}