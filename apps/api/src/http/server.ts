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
import { getOrganizationBilling } from './routes/Billing/get-billing-organization'
import { acceptInvite } from './routes/Invites/accept-invite'
import { createInvite } from './routes/Invites/create-invite'
import { getPendingInvite } from './routes/Invites/get-pending-invite'
import { getDetailsInvite } from './routes/Invites/invite-details'
import { rejectInvite } from './routes/Invites/reject-invite'
import { revokeInvite } from './routes/Invites/revoke-invite'
import { fetchAllOrganizationMembers } from './routes/Members/fetchAll-organization-members'
import { removeOrganizationMembers } from './routes/Members/remove-organization-member'
import { updateOrganizationMembers } from './routes/Members/update-members'
import { createOrganization } from './routes/Organization/create-organization'
import { getDetailsOrganization } from './routes/Organization/get-details-organization'
import { getMembership } from './routes/Organization/get-membership'
import { getOrganizations } from './routes/Organization/get-organizations'
import { shutdownOrganization } from './routes/Organization/shutdown-organization'
import { transferOrganization } from './routes/Organization/transfer-organization'
import { updateOrganization } from './routes/Organization/update-organization'
import { createProject } from './routes/Projects/create-project'
import { deleteProject } from './routes/Projects/delete-project'
import { getAllProjects } from './routes/Projects/fetch-all-projects'
import { getDetailsProject } from './routes/Projects/getDetailsProject'
import { updateProject } from './routes/Projects/update-project'

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

/**
 *  Authentication/Profile
 */

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(RequestPasswordRecover)
app.register(ResetPassword)

/**
 *  Orgnization
 */

app.register(createOrganization)
app.register(getMembership)
app.register(getDetailsOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

/**
 *  Projects
 */

app.register(createProject)
app.register(deleteProject)
app.register(getDetailsProject)
app.register(getAllProjects)
app.register(updateProject)

/**
 * Members
 */

app.register(fetchAllOrganizationMembers)
app.register(updateOrganizationMembers)
app.register(removeOrganizationMembers)

/**
 * Invites
 */

app.register(createInvite)
app.register(getDetailsInvite)

/**
 * Actions Invite Members
 *
 */

app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvite)

/**
 * Billing
 */

app.register(getOrganizationBilling)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running')
})
