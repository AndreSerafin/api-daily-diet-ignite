import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/users/sessions', authenticate)
  app.post('/me', { onRequest: [verifyJwt] }, profile)
}
