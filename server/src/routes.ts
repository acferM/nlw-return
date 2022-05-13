import { Router } from "express"
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from './adapters/implementations/nodemailer/nodemailer-mail-adapter'
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

const routes = Router()



const nodemailerMailAdapter = new NodemailerMailAdapter()

const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})

routes.post('/users', async (req, res) => {

})

export { routes }