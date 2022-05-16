import mailgun from 'mailgun-js'
import { MailAdapter, SendMailDTO } from "../../mail-adapter";

export class MailgunMailAdapter implements MailAdapter {
  private client: mailgun.Mailgun

  constructor() {
    this.client = mailgun({
      apiKey: '61a8527f9c7e85303ab1f364e39dfe8d-100b5c8d-78ab184d',
      domain: 'https://api.mailgun.net/v3/sandboxd9f6627ec3464e47858453c594e33ceb.mailgun.org',
    })
  }

  async sendMail({ body, subject, to }: SendMailDTO) {
    await this.client.messages().send({
      from: 'Equipe feedget <promacfer@gmail.com>',
      to: 'matheusacfer4@gmai.com',
      subject: 'hello',
      text: 'testing this',
    })
  }
}