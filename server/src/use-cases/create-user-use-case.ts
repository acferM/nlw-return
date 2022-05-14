import { HashAdapter } from "../adapters/hash-adapter";
import { UsersRepository } from "../repositories/users-repository";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: UsersRepository,

    private hashAdapter: HashAdapter
  ) { }

  async execute({ name, email, password }: CreateUserRequest) {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.hashAdapter.hash(password)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}