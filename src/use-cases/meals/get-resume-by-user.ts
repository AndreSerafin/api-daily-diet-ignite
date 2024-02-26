import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MealsRepository } from '@/repositories/meals-repository'

interface GetUserResumeUseCaseRequest {
  userId: string
}

interface Resume {
  total_of_meals: number
  meals_at_diet: number
  meals_out_of_diet: number
  best_sequence: number
}

interface GetUserResumeUseCaseResponse {
  resume: Resume
}

export class GetUserResumeUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId: id,
  }: GetUserResumeUseCaseRequest): Promise<GetUserResumeUseCaseResponse> {
    const userMeals = await this.mealsRepository.fetchByUser(id)

    let bestSequence = 0
    let currentSequence = 0

    for (let i = 0; i < userMeals.length; i++) {
      const meal = userMeals[i]
      if (meal.is_at_diet) {
        currentSequence++
        if (currentSequence > bestSequence) {
          bestSequence = currentSequence
        }
      } else {
        currentSequence = 0
      }
    }

    const resume = {
      best_sequence: bestSequence,
      meals_at_diet: userMeals.filter((meal) => meal.is_at_diet).length,
      meals_out_of_diet: userMeals.filter((meal) => !meal.is_at_diet).length,
      total_of_meals: userMeals.length,
    }

    if (!userMeals) {
      throw new ResourceNotFoundError()
    }
    return { resume }
  }
}
