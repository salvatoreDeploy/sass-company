'use server'

import { getCurrentOrganization } from "@/auth/auth"
import { removeMember } from "@/http/remove-member"
import { revokeInviteMember } from "@/http/revoke-inivite-member"
import { updateMemberRole } from "@/http/update-member-role"
import { Role } from "@saas-company/auth"
import { revalidateTag } from "next/cache"

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