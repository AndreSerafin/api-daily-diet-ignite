import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)
  })

  it('should be able create a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      isAtDiet: true,
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Arroz')
  })
})
