import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateUserDTO, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data: {
        ...data,
      }
    })

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user;
  }
}