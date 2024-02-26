import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'

interface CreateMealUseCaseRequest {
  name: string
  description?: string
  isAtDiet: boolean
  userId: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    isAtDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      name,
      description,
      is_at_diet: isAtDiet,
      user_id: userId,
    })

    return { meal }
  }
}
