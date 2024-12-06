'use server'

import { acceptInvite } from "@/http/accept-invite";
import { revalidateTag } from "next/cache";

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite({ inviteId })

  revalidateTag('organizations')
}

export async function rejectUserInviteAction(inviteId: string) {
  await rejectUserInviteAction(inviteId)

  revalidateTag('organizations')
}