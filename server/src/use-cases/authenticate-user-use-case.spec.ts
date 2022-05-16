import { FakeHashAdapter } from "../adapters/fakes/hash/fake-hash-adapter";
import { AppError } from "../errors/AppError";
import { FakeUsersRepository } from "../repositories/fakes/fake-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

let fakeUsersRepository: FakeUsersRepository
let fakeHashAdapter: FakeHashAdapter
let authenticateUser: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashAdapter = new FakeHashAdapter()
    authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeHashAdapter
    )
  })

  it('Should be able to authenticate a user', async () => {
    const user = {
      name: 'fake-name',
      email: 'user@example.com',
      password: '123456',
    }

    await fakeUsersRepository.create(user)

    const response = await authenticateUser.execute(user)

    expect(response).toHaveProperty('token')
    expect(response.user.email).toEqual(user.email)
  })

  it('Should not be able to authenticate a inexistent user', async () => {
    await expect(authenticateUser.execute({
      email: 'fake@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate a user with wrong email', async () => {
    const user = {
      name: 'fake-name',
      email: 'user@example.com',
      password: '123456',
    }

    await fakeUsersRepository.create(user)

    await expect(authenticateUser.execute({
      email: 'wrong@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate a user with wrong password', async () => {
    const user = {
      name: 'fake-name',
      email: 'user@example.com',
      password: '123456',
    }

    await fakeUsersRepository.create(user)

    await expect(authenticateUser.execute({
      email: 'user@example.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError)
  })
})