export interface SendMailDTO {
  to: string
  subject: string
  body: string
}

export interface MailAdapter {
  sendMail: (data: SendMailDTO) => Promise<void>
}