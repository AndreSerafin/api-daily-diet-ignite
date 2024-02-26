import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'
import { EditMealUseCase } from './edit-meal'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

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

    const { meal: editedMeal } = await sut.execute({
      id: createdMeal.id,
      userId: createdMeal.user_id,
      meal: {
        name: 'Arroz Frito',
        description: 'Arroz frito com salada',
      },
    })

    expect(editedMeal).toEqual(
      expect.objectContaining({
        name: 'Arroz Frito',
        description: 'Arroz frito com salada',
        id: createdMeal.id,
      }),
    )
  })

  it('should not be able to edit a meal created by another user', async () => {
    mealsRepository.create({
      name: 'Lasanha',
      description:
        'Lasanha de carne moída, molho de tomate, queijo e massa fresca',
      is_at_diet: false,
      user_id: 'user-01',
    })

    const mealToEdit = await mealsRepository.create({
      name: 'Salada Caesar',
      description:
        'Salada de alface romana, croutons, queijo parmesão e molho Caesar',
      is_at_diet: true,
      user_id: 'user-02',
    })

    expect(async () => {
      await sut.execute({
        id: mealToEdit.id,
        userId: 'user-01',
        meal: { name: ' Feijoada', description: '' },
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
