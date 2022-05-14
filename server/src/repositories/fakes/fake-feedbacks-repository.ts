import { Feedback } from "@prisma/client";
import { v4 as uuid } from 'uuid'
import { CreateFeedbackDTO, FeedbacksRepository } from "../feedbacks-repository";

export class FakeFeedbacksRepository implements FeedbacksRepository {
  feedbacks: Feedback[] = [];

  async create(data: CreateFeedbackDTO) {
    const feedback = {
      id: uuid(),
      ...data,
      screenshot: data.screenshot ?? null,
      createdAt: new Date(),
    }

    this.feedbacks.push(feedback)
  }


  async findAll(page: number) {
    return this.feedbacks.slice((page - 1) * 9, page * 9)
  }
}