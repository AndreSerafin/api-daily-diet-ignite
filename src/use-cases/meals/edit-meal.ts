import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface MealData {
  name: string
  description: string
  isAtDiet: boolean
}

interface EditMealUseCaseRequest {
  id: string
  userId: string
  meal: Partial<MealData>
}

interface EditMealUseCaseResponse {
  meal: Meal
}

export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
    meal: { description, isAtDiet, name },
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealsRepository.update(id, userId, {
      name,
      description,
      is_at_diet: isAtDiet,
    })

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
