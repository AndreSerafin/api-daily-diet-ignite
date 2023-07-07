import { FastifyInstance } from 'fastify'
import {
  createMeal,
  deleteMealById,
  getMealById,
  getMeals,
  updateMealById,
} from '../controllers/meals'
import { checkJwtExists } from '../middlewares/check-jwt'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkJwtExists] }, createMeal)
  app.get('/', { preHandler: [checkJwtExists] }, getMeals)
  app.get('/:id', { preHandler: [checkJwtExists] }, getMealById)
  app.put('/:id', { preHandler: [checkJwtExists] }, updateMealById)
  app.delete('/:id', { preHandler: [checkJwtExists] }, deleteMealById)
}
