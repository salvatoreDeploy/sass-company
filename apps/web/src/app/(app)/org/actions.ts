'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'
import { getCurrentOrganization } from '@/auth/auth'
import { updateOrganization } from '@/http/update-organization'
import { revalidateTag } from 'next/cache'

const createOrganizationSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters.' }),
  domain: z.string().nullable().refine(value => {
    if (value) {
      const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      return domainRegex.test(value)
    }

    return true
  }, { message: 'Please, enter a valid domain.' }),
  shouldAttachUserByDomain: z.union([z.literal('on'), z.literal('off'), z.boolean()]).transform(value => value === true || value === 'on').default(false)
}).refine(data => {
  if (data.shouldAttachUserByDomain === true && !data.domain) {
    return false
  }

  return true
}, {
  message: 'Domain is required when auto-join is enabled.',
  path: ['domain']
})

interface KyResponseJson {
  message: any
}

export type OrganizationSchema = z.infer<typeof createOrganizationSchema>

export async function createOrganizationAction(data: FormData) {
  const result = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUserByDomain } = result.data

  try {
    await createOrganization({
      name, domain, shouldAttachUserByDomain
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

  return { success: true, message: 'Successfuly saved the organization', errors: null }

  revalidateTag('organizations')
}

export async function updateOrganizationAction(data: FormData) {

  const currentOrg = getCurrentOrganization()

  const result = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUserByDomain } = result.data

  try {
    await updateOrganization({
      org: currentOrg!,
      name, domain, shouldAttachUserByDomain
    })

    revalidateTag('organizations')

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

  return { success: true, message: 'Successfuly saved the organization', errors: null }
}