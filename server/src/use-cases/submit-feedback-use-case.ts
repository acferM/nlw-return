import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,

    private mailAdapter: MailAdapter,
  ) { }

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<html>',
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot !== null ? `<img src="${screenshot}" />` : '',
        '</div>',
        '</html>'
      ].join('\n')
    })
  }
}
