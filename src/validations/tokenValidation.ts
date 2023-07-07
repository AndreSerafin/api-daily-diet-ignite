import { z } from 'zod'

export const tokenSchema = z.object({ email: z.string().email() })
