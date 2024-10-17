import { signWithGithub } from "@/http/sign-in-with-github";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const githubCode = searchParams.get('code')

  if (!githubCode) {
    return NextResponse.json(
      { message: 'Github OAuth code not found.' },
      { status: 400 }
    )
  }

  const { token } = await signWithGithub({ githubCode })

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return NextResponse.redirect("http://localhost:3000/")
}