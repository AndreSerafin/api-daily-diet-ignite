import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string, user_id: string): Promise<Meal | null>

  fetchByUser(user_id: string): Promise<Meal[]>

  update(
    id: string,
    user_id: string,
    data: Prisma.MealUncheckedUpdateInput,
  ): Promise<Meal | null>

  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>

  delete(id: string, user_id: string): Promise<Meal | undefined>
}
