import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../services/prisma'
import {
  mealIdSchema,
  mealValidationSchema,
  updateMealValidationSchema,
} from '../validations/mealValidationSchemas'
import {
  create,
  deleteById,
  getById,
  list,
  update,
} from '../repositories/meals'
import jwt from 'jsonwebtoken'
import { tokenSchema } from '../validations/tokenValidation'

export async function createMeal(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const { name, isAtDiet, description } = mealValidationSchema.parse(
          req.body,
        )

        const meal = await create({
          isAtDiet,
          name,
          userId: user.id,
          description,
        })
        return rep.status(201).send({ meal })
      }
    }
    return rep.status(400).send({ message: 'Meal creation failed' })
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function getMeals(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const meal = await list(user.id)
        if (meal) {
          return rep.status(200).send({ meal })
        }
      }
    }

    return rep.status(400).send({ message: 'Any meals found for this user' })
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function getMealById(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization
  const { id } = mealIdSchema.parse(req.params)

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const meal = await getById(user.id, Number.parseInt(id))
        if (meal) {
          return rep.status(200).send({ meal })
        }
      }
    }

    return rep.status(400).send({ message: 'Id not found' })
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function deleteMealById(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization
  const { id } = mealIdSchema.parse(req.params)

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const meal = await deleteById(user.id, Number.parseInt(id))
        if (meal) {
          return rep.status(200).send({ meal })
        }
      }
    }

    return rep.status(400).send({ message: 'Id not found' })
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function updateMealById(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization
  const { id } = mealIdSchema.parse(req.params)

  const data = updateMealValidationSchema.parse(req.body)

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const meal = await update(data, user.id, Number.parseInt(id))
        if (meal) {
          return rep.status(200).send({ meal })
        }
      }
      return rep.status(400).send({ message: 'Id not found' })
    }
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}
