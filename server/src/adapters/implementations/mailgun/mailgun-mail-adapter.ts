import mailgun from 'mailgun-js'
import { MailAdapter, SendMailDTO } from "../../mail-adapter";

export class MailgunMailAdapter implements MailAdapter {
  private client: mailgun.Mailgun

  constructor() {
    this.client = mailgun({
      apiKey: process.env.MAILGUN_API_KEY!,
      domain: 'sandboxd9f6627ec3464e47858453c594e33ceb.mailgun.org',
    })
  }

  async sendMail({ body, subject, to }: SendMailDTO) {
    await this.client.messages().send({
      from: 'Equipe feedget <promacfer@gmail.com>',
      to: 'promacfer@gmail.com',
      subject,
      text: 'testing this',
    }, (error, body) => {
      if (error) {
        console.log(error)
      }

      console.log(body)
    })
  }
}