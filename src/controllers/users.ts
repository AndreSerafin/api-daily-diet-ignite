import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  listUsers,
  updateUser,
} from '../repositories/user'
import {
  idSchema,
  updateUserValidationSchema,
  userValidationSchema,
} from '../validations/userValidationSchemas'
import { tokenSchema } from '../validations/tokenValidation'
import jwt from 'jsonwebtoken'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  try {
    let { email, name, password } = userValidationSchema.parse(req.body)

    password = bcrypt.hashSync(password, 10)

    const response = await createUser({ email, name, password })

    rep.send(response)
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function list(req: FastifyRequest, rep: FastifyReply) {
  try {
    const users = await listUsers()

    return { users }
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function getById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = idSchema.parse(req.params)

  try {
    const user = await getUserById(id)

    if (!user) {
      rep.status(404).send({ message: 'id not found' })
    }

    rep.status(201).send({ user })
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function deleteUserById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = idSchema.parse(req.params)
  try {
    const deletedUser = await deleteUser(id)
    if (!deletedUser) {
      rep.status(404).send({ message: 'id not found' })
    }
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function updateUserById(req: FastifyRequest, rep: FastifyReply) {
  const { id } = idSchema.parse(req.params)
  let { email, name, password } = updateUserValidationSchema.parse(req.body)

  if (password) {
    password = bcrypt.hashSync(password, 10)
  }

  try {
    const updatedUser = await updateUser(id, { email, name, password })

    if (!updatedUser) {
      rep.status(404).send({ message: 'id not found' })
    }
    rep.status(200).send(updatedUser)
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}

export async function getResume(req: FastifyRequest, rep: FastifyReply) {
  let token = req.cookies.jwt || req.headers.authorization

  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const { email } = tokenSchema.parse(jwt.decode(token))

      const user = await getUserByEmail(email)

      const resume = {
        total: 0,
        totalAtDiet: 0,
        totalNotAtDiet: 0,
        percentAtDiet: 0,
        sequence: 0,
      }

      if (user) {
        user.meals.forEach((meal) => {
          resume.total += 1
          if (meal.isAtDiet) {
            resume.totalAtDiet += 1
            resume.sequence += 1
          } else {
            resume.totalNotAtDiet += 1
            resume.sequence = 0
          }
        })

        resume.percentAtDiet = Number(
          ((resume.totalAtDiet * 100) / resume.total).toFixed(2),
        )

        return rep.status(200).send(resume)
      }
      return rep.status(400).send({ message: 'Id not found' })
    }
  } catch (e: any) {
    return rep.status(400).send({ message: JSON.parse(e.message) })
  }
}
