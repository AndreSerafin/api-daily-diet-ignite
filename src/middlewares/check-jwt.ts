import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'

export async function checkJwtExists(req: FastifyRequest, rep: FastifyReply) {
  const token = req.cookies.jwt || req.headers.authorization

  if (!token) {
    rep.status(401).send({ message: 'Token is required' })
  }

  try {
    if (token) {
      const replace = token.replace('Bearer ', '')
      jwt.verify(replace, env.JWT_SECRET)
    }
  } catch (e: any) {
    rep.status(401).send({ message: 'Invalid credentials' })
  }
}
