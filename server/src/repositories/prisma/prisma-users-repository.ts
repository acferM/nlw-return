import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateUserDTO, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data: {
        ...data,
      }
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}