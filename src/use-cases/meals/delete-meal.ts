import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Meal } from '@prisma/client'

interface DeleteMealUseCaseRequest {
  id: string
  userId: string
}

interface DeleteMealUseCaseResponse {
  meal: Meal
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.delete(id, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
