import { prisma } from "../../prisma";
import { CreateFeedbackDTO, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })
  }
}