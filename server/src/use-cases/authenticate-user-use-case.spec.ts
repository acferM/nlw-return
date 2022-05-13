import { AppError } from "../errors/AppError";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

type FakeUsersRepository = {
  users: any[]
  create: (data: any) => any
  findByEmail: (email: string) => any
}

const usersRepository: FakeUsersRepository = {
  users: [],
  create(data: any) {
    this.users.push({ ...data, password: `hashed-${data.password}` });
    return data;
  },
  findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }
}

const hashAdapter = {
  hash: async (payload: string) => `hashed-${payload}`,
  compare: async (payload: string, hashed: string) => payload === hashed.replace('hashed-', '')
}

const authenticateUser = new AuthenticateUserUseCase(
  usersRepository,
  hashAdapter,
);

describe('Authenticate User Use Case', () => {
  it('Should be able to authenticate a user', async () => {
    const user = {
      id: 'fake-id',
      email: 'user@example.com',
      password: '123456',
    }

    await usersRepository.create(user)

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
      id: 'fake-id',
      email: 'user@example.com',
      password: '123456',
    }

    await usersRepository.create(user)

    await expect(authenticateUser.execute({
      email: 'wrong@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate a user with wrong password', async () => {
    const user = {
      id: 'fake-id',
      email: 'user@example.com',
      password: '123456',
    }

    await usersRepository.create(user)

    await expect(authenticateUser.execute({
      email: 'user@example.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError)
  })
})