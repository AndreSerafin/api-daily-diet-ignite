import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getUser } from '../repositories/auth'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { env } from '../env'

export async function login(req: FastifyRequest, rep: FastifyReply) {
  const emailValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = emailValidationSchema.parse(req.body)

  try {
    const user = await getUser(email)

    if (!user) {
      console.log('User does not exists')
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRATION_TIME },
      )
      rep.status(200).send({ token })
    } else {
      rep.status(400).send({ message: 'User and/or password are incorrect' })
    }
  } catch (e: any) {
    rep.status(400).send({ message: JSON.parse(e.message) })
  }
}
