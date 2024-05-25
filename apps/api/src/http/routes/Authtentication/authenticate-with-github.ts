import { env } from '@saas-company/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadResquestError } from '../_erros/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/session/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with social GitHub',
        body: z.object({
          githubCode: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { githubCode } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET,
      )
      githubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_URI,
      )
      githubOAuthURL.searchParams.set('code', githubCode)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      // https://github.com/login/oauth/authorize?client_id=Ov23liLlkE5tXj4rk4Gy&redirect_uri=http://localhost:3000/api/auth/callback&scope=user:email

      const githubUserData = await githubUserResponse.json()

      const {
        id: githubId,
        name,
        avatar_url: avatarUrl,
        email,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadResquestError(
          'Your GitHub account must have an email to autehnticate',
        )
      }

      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          expiresIn: '7d',
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
// https://github.com/login/oauth/authorize?client_id=Ov23liLlkE5tXj4rk4Gy&redirect_uri=http://localhost:3000/api/auth/callback&scope=user:email
