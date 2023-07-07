import { z } from 'zod'

export const mealValidationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  isAtDiet: z.boolean(),
})

export const updateMealValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isAtDiet: z.boolean().optional(),
})

export const mealIdSchema = z.object({
  id: z.string(),
})
