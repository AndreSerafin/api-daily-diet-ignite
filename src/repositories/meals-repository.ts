import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  update(
    id: string,
    data: Prisma.MealUncheckedUpdateInput,
  ): Promise<Meal | null>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
}
