import { IMeal, IUpdatedMeal } from '../interfaces/interfaces'
import { prisma } from '../services/prisma'

export async function create(data: IMeal) {
  try {
    return await prisma.meal.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
        isAtDiet: data.isAtDiet,
      },
    })
  } catch (e: any) {
    return null
  }
}

export async function list(userId: string) {
  try {
    return await prisma.meal.findMany({ where: { userId } })
  } catch (e: any) {
    return null
  }
}
export async function update(data: IUpdatedMeal, userId: string, id: number) {
  try {
    await prisma.meal.updateMany({ data, where: { id, userId } })
    return await getById(userId, id)
  } catch (e: any) {
    return null
  }
}

export async function getById(userId: string, id: number) {
  try {
    return await prisma.meal.findFirst({ where: { userId, id } })
  } catch (e: any) {
    return null
  }
}

export async function deleteById(userId: string, id: number) {
  try {
    await prisma.meal.deleteMany({ where: { userId, id } })
    return await list(userId)
  } catch (e: any) {
    return null
  }
}
