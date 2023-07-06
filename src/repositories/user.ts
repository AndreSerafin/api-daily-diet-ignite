import { Prisma } from '@prisma/client'
import { prisma } from '../services/prisma'

interface IUser {
  name: string
  email: string
  password: string
  sesion_id?: string
}

interface IUpdatedUser {
  name?: string
  email?: string
  password?: string
  sesion_id?: string
}

export async function createUser(data: IUser) {
  try {
    return await prisma.user.create({
      data,
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
