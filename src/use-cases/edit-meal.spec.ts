import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'
import { EditMealUseCase } from './edit-meal'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let sut: EditMealUseCase

describe('Edit Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealsRepository)
    sut = new EditMealUseCase(mealsRepository)
  })

  it('should be able to edit a meal', async () => {
    const { meal: createdMeal } = await createMealUseCase.execute({
      name: 'Arroz',
      description: 'Arroz com salada e feijão',
      isAtDiet: true,
      userId: 'user-01',
    })

    const { meal: editedMeal } = await sut.execute(createdMeal.id, {
      name: 'Arroz Frito',
      description: 'Arroz frito com salada',
    })

    expect(editedMeal).toEqual(
      expect.objectContaining({
        name: 'Arroz Frito',
        description: 'Arroz frito com salada',
        id: createdMeal.id,
      }),
    )
  })

  it('should not be able to edit an unexistent meal', async () => {
    expect(async () => {
      await sut.execute('meal-01', {
        name: 'Arroz Frito',
        description: 'Arroz frito com salada',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
