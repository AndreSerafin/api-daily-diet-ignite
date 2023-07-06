import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from '../repositories/user'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const userValidationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    let { email, name, password } = userValidationSchema.parse(req.body)

    password = bcrypt.hashSync(password, 10)
    console.log(password)

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

const idSchema = z.object({ id: z.string().uuid() })

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
  const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  })

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
