import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { middlewareAuth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadResquestError } from '../_erros/bad-request-error'
import { UnathorizedResquestError } from '../_erros/unathorized-error'

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(middlewareAuth)
    .delete(
      '/organization/:slug/invite/:inviteId',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Revoke an Inivite',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            inviteId: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { inviteId, slug } = request.params

        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnathorizedResquestError(
            `You're not allowed to delete an invite`,
          )
        }

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
          },
        })

        if (!invite) {
          throw new BadResquestError('Invite not found')
        }

        await prisma.invite.delete({
          where: {
            organizationId: organization.id,
            id: inviteId,
          },
        })

        return reply.status(201).send()
      },
    )
}
