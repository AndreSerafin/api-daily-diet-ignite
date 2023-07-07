import { FastifyInstance } from 'fastify'
import {
  create,
  deleteUserById,
  getById,
  getResume,
  list,
  updateUserById,
} from '../controllers/users'
import { checkJwtExists } from '../middlewares/check-jwt'
import { checkIsAdmin } from '../middlewares/check-is-admin'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.get('/', { preHandler: [checkJwtExists, checkIsAdmin] }, list)
  app.get('/:id', { preHandler: [checkJwtExists, checkIsAdmin] }, getById)
  app.delete(
    '/:id',
    { preHandler: [checkJwtExists, checkIsAdmin] },
    deleteUserById,
  )
  app.put(
    '/:id',
    { preHandler: [checkJwtExists, checkIsAdmin] },
    updateUserById,
  )
  app.get('/resume', { preHandler: [checkJwtExists] }, getResume)
}
