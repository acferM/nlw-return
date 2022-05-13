import { FakeHashAdapter } from "../adapters/fakes/hash/fake-hash-adapter"
import { FakeUsersRepository } from "../repositories/fakes/fake-users-repository"
import { CreateUserUseCase } from "./create-user-use-case"

let fakeUsersRepository: FakeUsersRepository
let fakeHashAdapter: FakeHashAdapter
let createUser: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashAdapter = new FakeHashAdapter()
    createUser = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashAdapter
    )
  })

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toEqual('fake@email.com')
    expect(user.password).toEqual('hashed-123456')
  })

  it('Should not be able to create a already existent user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(createUser.execute({
      name: 'John Doe2',
      email: 'fake@email.com',
      password: '123456'
    })).rejects.toThrow()
  })
})