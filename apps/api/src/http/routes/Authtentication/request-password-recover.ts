import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { middlewareAuth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function RequestPasswordRecover(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(middlewareAuth)
    .post(
      '/password/recover',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Request password user recover',
          body: z.object({
            email: z.string(),
          }),
          response: {
            201: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { email } = request.body

        const userfromEmail = await prisma.user.findUnique({ where: { email } })

        if (!userfromEmail) {
          return reply.status(201).send()
        }

        const { id: code } = await prisma.token.create({
          data: {
            type: 'PASSWORD_RECOVER',
            userId: userfromEmail.id,
          },
        })

        // Send e-mail with password recover link

        console.log('Recover password token', code)

        return reply.status(201).send()
      },
    )
}
