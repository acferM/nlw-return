export interface CreateFeedbackDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: CreateFeedbackDTO) => Promise<void>;
}