'use server'

import { getCurrentOrganization } from "@/auth/auth"
import { removeMember } from "@/http/remove-member"
import { revalidateTag } from "next/cache"

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrganization()

  await removeMember({
    org: currentOrg!,
    memberId
  })

  revalidateTag(`${currentOrg}-members`)
}