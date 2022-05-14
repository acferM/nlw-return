import { Feedback } from "@prisma/client";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class ShowFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) { }

  async execute(page = 1): Promise<Feedback[]> {
    return this.feedbacksRepository.findAll(page);
  }
}