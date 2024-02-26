import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetUserResumeUseCase } from './get-resume-by-user'

let mealsRepository: InMemoryMealsRepository
let sut: GetUserResumeUseCase

describe('Resume by user Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserResumeUseCase(mealsRepository)

    mealsRepository.create({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      is_at_diet: true,
      user_id: 'user-01',
    })

    mealsRepository.create({
      name: 'Frango com salada',
      description: 'Peito de frango com salada',
      is_at_diet: true,
      user_id: 'user-01',
    })

    mealsRepository.create({
      name: 'Sushi',
      description: 'Seleção de sushis variados: nigiri, sashimi, maki e temaki',
      is_at_diet: false,
      user_id: 'user-01',
    })

    mealsRepository.create({
      name: 'Salada Caesar',
      description:
        'Salada de alface romana, croutons, queijo parmesão e molho Caesar',
      is_at_diet: true,
      user_id: 'user-01',
    })

    mealsRepository.create({
      name: 'Lasanha',
      description:
        'Lasanha de carne moída, molho de tomate, queijo e massa fresca',
      is_at_diet: false,
      user_id: 'user-01',
    })
  })

  it('should be able to get the resume of an user', async () => {
    const { resume } = await sut.execute({
      userId: 'user-01',
    })

    expect(resume).toStrictEqual({
      best_sequence: 2,
      meals_at_diet: 3,
      meals_out_of_diet: 2,
      total_of_meals: 5,
    })
  })
})
