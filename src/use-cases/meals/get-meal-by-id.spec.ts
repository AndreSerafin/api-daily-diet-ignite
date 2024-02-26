import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealByIdUseCase } from './get-meal-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealByIdUseCase

describe('Fetch meals by user Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealByIdUseCase(mealsRepository)
  })

  it('should be able get a specic meal of an user', async () => {
    mealsRepository.create({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      is_at_diet: true,
      user_id: 'user-01',
    })

    const selectedMeal = await mealsRepository.create({
      name: 'Sushi',
      description: 'Seleção de sushis variados: nigiri, sashimi, maki e temaki',
      is_at_diet: false,
      user_id: 'user-02',
    })

    const { meal } = await sut.execute({
      id: selectedMeal.id,
      userId: 'user-02',
    })

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'Sushi',
        description:
          'Seleção de sushis variados: nigiri, sashimi, maki e temaki',
        is_at_diet: false,
        user_id: 'user-02',
      }),
    )
  })

  it('should be able get a meal created by another user', async () => {
    mealsRepository.create({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      is_at_diet: true,
      user_id: 'user-01',
    })

    const selectedMeal = await mealsRepository.create({
      name: 'Sushi',
      description: 'Seleção de sushis variados: nigiri, sashimi, maki e temaki',
      is_at_diet: false,
      user_id: 'user-02',
    })

    expect(async () => {
      await sut.execute({
        id: selectedMeal.id,
        userId: 'user-01',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
