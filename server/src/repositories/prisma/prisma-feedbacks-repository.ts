import { prisma } from "../../prisma";
import { CreateFeedbackDTO, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot, creatorId }: CreateFeedbackDTO): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        creator: {
          connect: {
            id: creatorId
          }
        }
      },
    })
  }

  async findAll(page: number) {
    return prisma.feedback.findMany({
      take: 9,
      skip: 9 * (page - 1),
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}