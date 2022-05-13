import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { HashAdapter } from "../adapters/hash-adapter";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/users-repository";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  token: string;
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashAdapter: HashAdapter
  ) { }

  async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const passwordMatches = await this.hashAdapter.compare(password, user.password)

    if (!passwordMatches) {
      throw new AppError('Wrong email/password combination', 401)
    }

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: user.id,
      expiresIn: '1d',
    })

    return { token, user }
  }
}