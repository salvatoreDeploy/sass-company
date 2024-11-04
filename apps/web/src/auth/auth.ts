import { getMembership } from "@/http/get-membership";
import { getProfile } from "@/http/get-profile";
import { defineAbilityFor } from "@saas-company/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentOrganization() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrganization()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role
  })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { me } = await getProfile()

    return { me }
  } catch {

  }

  redirect('api/auth/sign-out')
}