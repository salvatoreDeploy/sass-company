import { roleSchema } from '@saas-company/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { middlewareAuth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadResquestError } from '../_erros/bad-request-error'

export async function getPendingInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(middlewareAuth)
    .get(
      '/invite/pending-invite',
      {
        schema: {
          tags: ['Actions Members Invites'],
          summary: 'Get all user pending invites',
          security: [{ bearerAuth: [] }],
          response: {
            201: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  email: z.string().email(),
                  role: roleSchema,
                  createdAt: z.date(),
                  author: z
                    .object({
                      id: z.string().uuid(),
                      name: z.string().nullable(),
                      avatarUrl: z.string().nullable(),
                    })
                    .nullable(),
                  organization: z.object({
                    name: z.string(),
                  }),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadResquestError('User not found')
        }

        const invites = await prisma.invite.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            organization: {
              select: {
                name: true,
              },
            },
          },
          where: {
            email: user.email,
          },
        })

        return reply.status(201).send({ invites })
      },
    )
}
