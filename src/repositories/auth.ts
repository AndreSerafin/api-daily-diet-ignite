import { prisma } from '../services/prisma'

export async function getUser(email: string) {
  return await prisma.user.findUnique({ where: { email } })
}
