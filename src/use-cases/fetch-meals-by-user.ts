import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'

interface FetchMealsByUserUseCaseRequest {
  userId: string
}

interface FetchMealsByUserUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsByUserUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchMealsByUserUseCaseRequest): Promise<FetchMealsByUserUseCaseResponse> {
    const meals = await this.mealsRepository.fetchByUser(userId)

    return { meals }
  }
}
