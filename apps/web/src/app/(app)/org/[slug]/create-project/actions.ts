'use server'

import { getCurrentOrganization } from '@/auth/auth'
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import { z } from 'zod'

/* import { createProject } from '@/http/create-project'
 */
const createProjectSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters.' }),
  description: z.string().nullable()
})

interface KyResponseJson {
  message: any
}

export async function createProjectAction(data: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await createProject({
      name, description, org: getCurrentOrganization()!
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

  return { success: true, message: 'Successfuly saved the project', errors: null }
}
