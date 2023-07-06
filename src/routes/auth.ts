import { FastifyInstance } from 'fastify'
import { login } from '../controllers/auth'

export async function authRoutes(app: FastifyInstance) {
  app.post('/', login)
}
