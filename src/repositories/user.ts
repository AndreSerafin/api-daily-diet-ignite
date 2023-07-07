import { Prisma } from '@prisma/client'
import { prisma } from '../services/prisma'
import { IUpdatedUser, IUser } from '../interfaces/interfaces'

export async function createUser(data: IUser) {
  try {
    return await prisma.user.create({
      data,
      select: { id: true, email: true,  },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return { message: 'this email is alredy on use' }
      }
    }
  }
}

export async function listUsers() {
  const users = await prisma.user.findMany({})
  return users
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({ where: { id } })
  } catch (e: any) {
    return null
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        createdAt: true,
        email: true,
        meals: true,
      },
    })
  } catch (e: any) {
    return null
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({ where: { id } })
  } catch (e: any) {
    return null
  }
}

export async function updateUser(id: string, data: IUpdatedUser) {
  try {
    const user = await prisma.user.update({ data, where: { id } })
    return user
  } catch (e: any) {
    return null
  }
}
