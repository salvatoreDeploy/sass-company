import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadResquestError } from '../_erros/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/session/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with e-mail and password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findFirst({
        where: { email },
      })

      if (!userFromEmail) {
        throw new BadResquestError('Invalid credentials')
      }

      if (userFromEmail.passwordHash === null) {
        throw new BadResquestError(
          'User does not have password, use social login',
        )
      }

      const isPasswordvalid = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordvalid) {
        throw new BadResquestError('Invalid credentials')
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          expiresIn: '7d',
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
