import { MailAdapter } from "../adapters/mail-adapter";
import { AppError } from "../errors/AppError";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { UsersRepository } from "../repositories/users-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  creatorId: string
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,

    private usersRepository: UsersRepository,

    private mailAdapter: MailAdapter,
  ) { }

  async execute({
    type,
    comment,
    creatorId,
    screenshot
  }: SubmitFeedbackUseCaseRequest) {
    const userExists = await this.usersRepository.findById(creatorId)

    if (!userExists) {
      throw new AppError('User not found')
    }

    if (!type) {
      throw new AppError('Type is required');
    }

    if (!comment) {
      throw new AppError('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new AppError('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      creatorId,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<html>',
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        '</div>',
        '</html>'
      ].join('\n')
    })
  }
}
