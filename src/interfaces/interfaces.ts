export interface IUser {
  name: string
  email: string
  password: string
  sessionId?: string
}

export interface IUpdatedUser {
  name?: string
  email?: string
  password?: string
  sessionId?: string
}

export interface IMeal {
  name: string
  userId: string
  description?: string
  isAtDiet: boolean
}

export interface IUpdatedMeal {
  name?: string
  userId?: string
  description?: string
  isAtDiet?: boolean
}
