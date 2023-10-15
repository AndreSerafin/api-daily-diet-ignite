import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditMealUseCaseRequest {
  name?: string
  description?: string
  isAtDiet?: boolean
  userId?: string
}

interface EditMealUseCaseResponse {
  meal: Meal
}

export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    id: string,
    { name, description, isAtDiet, userId }: EditMealUseCaseRequest,
  ): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealsRepository.update(id, {
      name,
      description,
      is_at_diet: isAtDiet,
      user_id: userId,
    })

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
