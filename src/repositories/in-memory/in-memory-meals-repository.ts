import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealsRepository {
  items: Array<Meal> = []

  async update(
    id: string,
    user_id: string,
    data: Prisma.MealUncheckedUpdateInput,
  ) {
    const mealIndex = this.items.findIndex(
      (item) => item.id === id && item.user_id === user_id,
    )

    if (mealIndex === -1) {
      return null
    }

    const updatedMeal: Meal = {
      id: this.items[mealIndex].id,
      name:
        typeof data.name === 'string' ? data.name : this.items[mealIndex].name,
      description:
        typeof data.description === 'string'
          ? data.description
          : this.items[mealIndex].description,
      is_at_diet:
        typeof data.is_at_diet === 'boolean'
          ? data.is_at_diet
          : this.items[mealIndex].is_at_diet,
      user_id: this.items[mealIndex].user_id,
      created_at: this.items[mealIndex].created_at,
      updated_at: new Date(),
    }

    this.items[mealIndex] = updatedMeal

    return updatedMeal
  }

  async findById(id: string, user_id: string) {
    const meal = this.items.find(
      (item) => item.id === id && item.user_id === user_id,
    )

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const newMeal: Meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      is_at_diet: data.is_at_diet,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(newMeal)

    return newMeal
  }

  async delete(id: string, user_id: string) {
    const mealsWithoutTheDeletedOne = [] as Meal[]
    let deletedMeal: Meal | undefined

    this.items.forEach((item) => {
      if (item.id === id && item.user_id === user_id) {
        deletedMeal = item
      } else {
        mealsWithoutTheDeletedOne.push(item)
      }
    })

    this.items = mealsWithoutTheDeletedOne

    return deletedMeal
  }

  async fetchByUser(user_id: string) {
    const meals = [] as Meal[]

    this.items.forEach((item) => {
      if (item.user_id === user_id) {
        meals.push(item)
      }
    })

    return meals
  }
}
