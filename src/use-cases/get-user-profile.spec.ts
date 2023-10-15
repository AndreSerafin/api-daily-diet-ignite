import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { RegisterUseCase } from './register'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to Get User Profile', async () => {
    const registerUseCase = new RegisterUseCase(usersRepository)

    const {
      user: { id },
    } = await registerUseCase.execute({
      name: 'Joaozinho da Silva',
      email: 'joaozinhodasilva@ex.com',
      password: '123456',
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.name).toEqual('Joaozinho da Silva')
  })

  it('should not be able to get user with wrong id', async () => {
    expect(async () => {
      await sut.execute({ userId: 'non-existent-id' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
