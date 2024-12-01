'use server'

import { getCurrentOrganization } from "@/auth/auth"
import { removeMember } from "@/http/remove-member"
import { revokeInviteMember } from "@/http/revoke-inivite-member"
import { updateMemberRole } from "@/http/update-member-role"
import { Role, roleSchema } from "@saas-company/auth"
import { revalidateTag } from "next/cache"
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import { z } from 'zod'
import { createInviteMember } from "@/http/create-invite-member"

const createInviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address' }),
  role: roleSchema
})

interface KyResponseJson {
  message: any
}

export async function createInviteActions(data: FormData) {
  const currentOrg = getCurrentOrganization()
  const result = createInviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  try {
    await createInviteMember({
      email, role, org: currentOrg!
    })

    revalidateTag(`${currentOrg}-invites`)

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

  return { success: true, message: 'Successfuly created new invite', errors: null }
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrganization()

  await removeMember({
    org: currentOrg!,
    memberId
  })

  revalidateTag(`${currentOrg}-members`)
}

export async function updateMemberRoleAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrganization()

  await updateMemberRole({
    org: currentOrg!,
    memberId,
    role
  })

  revalidateTag(`${currentOrg}-members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCurrentOrganization()

  await revokeInviteMember({
    org: currentOrg!,
    inviteId
  })

  revalidateTag(`${currentOrg}-invites`)
}
