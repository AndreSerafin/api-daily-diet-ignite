import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteMealUseCase } from './delete-meal'

let mealsRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealsRepository)
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const { meal: createdMeal } = await createMealUseCase.execute({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      isAtDiet: true,
      userId: 'user-01',
    })

    await sut.execute({
      id: createdMeal.id,
      userId: createdMeal.user_id,
    })

    expect(mealsRepository.items).toEqual([])
  })

  it('should not be able to delete a meal created by another user', async () => {
    const { meal: firstMeal } = await createMealUseCase.execute({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      isAtDiet: true,
      userId: 'user-01',
    })

    const { meal: secondMeal } = await createMealUseCase.execute({
      name: 'Frango Xadrez',
      description: 'Frango com legumes e molho',
      isAtDiet: true,
      userId: 'user-02',
    })

    expect(async () => {
      await sut.execute({
        id: secondMeal.id,
        userId: firstMeal.user_id,
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit an unexistent meal', async () => {
    expect(async () => {
      await sut.execute({ id: 'meal-01', userId: 'user-02' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
