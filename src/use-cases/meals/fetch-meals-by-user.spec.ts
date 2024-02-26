import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { FetchMealsByUserUseCase } from './fetch-meals-by-user'

let mealsRepository: InMemoryMealsRepository
let sut: FetchMealsByUserUseCase

describe('Fetch meals by user Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchMealsByUserUseCase(mealsRepository)

    mealsRepository.create({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      is_at_diet: true,
      user_id: 'user-01',
    })

    mealsRepository.create({
      name: 'Sushi',
      description: 'Seleção de sushis variados: nigiri, sashimi, maki e temaki',
      is_at_diet: false,
      user_id: 'user-02',
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
      user_id: 'user-02',
    })
  })

  it('should be able to fetch all meals of an user', async () => {
    const { meals } = await sut.execute({
      userId: 'user-01',
    })

    expect(meals).toHaveLength(2)

    expect(meals).toEqual([
      expect.objectContaining({ name: 'Arroz' }),
      expect.objectContaining({ name: 'Salada Caesar' }),
    ])
  })
})
