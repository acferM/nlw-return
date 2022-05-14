import { Router } from "express"
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from './adapters/implementations/nodemailer/nodemailer-mail-adapter'
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { BcryptHashAdapter } from "./adapters/implementations/hash/bcrypt-hash-adapter";
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";

const routes = Router()

const nodemailerMailAdapter = new NodemailerMailAdapter()
const bcryptHashAdapter = new BcryptHashAdapter()

const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
const prismaUsersREpository = new PrismaUsersRepository()

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
  const { name, email, password } = req.body

  const createUser = new CreateUserUseCase(
    prismaUsersREpository,
    bcryptHashAdapter,
  )

  const user = await createUser.execute({
    name,
    email,
    password
  })

  const { password: _, ...userWithoutPassword } = user

  return res.status(201).json(userWithoutPassword)
})

export { routes }