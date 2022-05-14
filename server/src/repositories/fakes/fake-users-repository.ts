import { User } from "@prisma/client";
import { v4 as uuid } from 'uuid'
import { CreateUserDTO, UsersRepository } from "../users-repository";

export class FakeUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: CreateUserDTO) {
    const user = {
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user);

    return user
  };

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    return user ?? null;
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id);

    return user ?? null;
  }
}