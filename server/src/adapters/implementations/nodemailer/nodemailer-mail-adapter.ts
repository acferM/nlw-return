import nodemailer from 'nodemailer'
import { MailAdapter, SendMailDTO } from "../../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "329754f903ac28",
    pass: "df143bec5d9516"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject, to }: SendMailDTO) {
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to,
      subject,
      html: body
    })
  };
}