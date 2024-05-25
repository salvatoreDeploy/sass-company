import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { UnathorizedResquestError } from '../_erros/unathorized-error'

export async function ResetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/reset',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Request password user recover',
        body: z.object({
          passwordToken: z.string(),
          newPassword: z.string().min(6),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { newPassword, passwordToken } = request.body

      const tokenFromCode = await prisma.token.findUnique({
        where: { id: passwordToken },
      })

      if (!tokenFromCode) {
        throw new UnathorizedResquestError()
      }

      const passwordHash = await hash(newPassword, 6)

      await prisma.user.update({
        where: {
          id: tokenFromCode.userId,
        },
        data: {
          passwordHash,
        },
      })

      return reply.status(204).send()
    },
  )
}
