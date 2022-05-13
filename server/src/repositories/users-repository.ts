import { User } from "@prisma/client";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export interface UsersRepository {
  create: (data: CreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
}