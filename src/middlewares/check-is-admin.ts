import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'
import { z } from 'zod'
import { prisma } from '../services/prisma'

export async function checkIsAdmin(req: FastifyRequest, rep: FastifyReply) {
  const decodedTokenSchema = z.object({
    email: z.string().email(),
    role: z.enum(['USER', 'ADMIN']),
  })

  let token = req.cookies.jwt || req.headers.authorization

  if (token) {
    token = token.replace('Bearer ', '')
    const decodedToken = jwt.verify(token, env.JWT_SECRET)

    const { email, role } = decodedTokenSchema.parse(decodedToken)
    const user = await prisma.user.findUnique({ where: { email } })

    if (role !== user?.role || role !== 'ADMIN') {
      return rep.status(401).send({ message: 'Unauthorized' })
    }
  }
}
