import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadResquestError } from './routes/_erros/bad-request-error'
import { UnathorizedResquestError } from './routes/_erros/unathorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const ErrorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      erros: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadResquestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnathorizedResquestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  console.error(error)

  // TODO: send to some observability platform

  return reply.status(500).send({ message: 'Internal server error' })
}
