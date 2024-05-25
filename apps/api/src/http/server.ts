import fastifyCors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas-company/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { ErrorHandler } from './error-handler'
import { authenticateWithGithub } from './routes/Authtentication/authenticate-with-github'
import { authenticateWithPassword } from './routes/Authtentication/authenticate-with-password'
import { createAccount } from './routes/Authtentication/create-account'
import { getProfile } from './routes/Authtentication/get-profile'
import { RequestPasswordRecover } from './routes/Authtentication/request-password-recover'
import { ResetPassword } from './routes/Authtentication/reset-password'
import { createOrganization } from './routes/Organization/create-organization'
import { getMembership } from './routes/Organization/get-membership'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(ErrorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Saas Company Api',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

/* Routes */

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(RequestPasswordRecover)
app.register(ResetPassword)
app.register(createOrganization)
app.register(getMembership)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running')
})
