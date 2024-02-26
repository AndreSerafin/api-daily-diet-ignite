import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetMealByIdUseCaseRequest {
  id: string
  userId: string
}

interface GetMealByIdUseCaseResponse {
  meal: Meal
}

export class GetMealByIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
  }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const meal = await this.mealsRepository.findById(id, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
