import { FastifyInstance } from 'fastify'
import {
  create,
  deleteUserById,
  getById,
  list,
  updateUserById,
} from '../controllers/users'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.get('/', list)
  app.get('/:id', getById)
  app.delete('/:id', deleteUserById)
  app.put('/:id', updateUserById)
}
