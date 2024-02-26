import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { RegisterUseCase } from './register'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'joaozinhodasilva@gmail.com'
    const password = '123456'

    await registerUseCase.execute({
      name: 'Joaozinho da Silva',
      email,
      password,
    })

    const { user } = await sut.execute({ email, password })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with unexistent email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'joaozinhodasilva@gmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await registerUseCase.execute({
      name: 'Joaozinho da Silva',
      email: 'joaozinhodasilva@gmail.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        email: 'joaozinhodasilva@gmail.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
