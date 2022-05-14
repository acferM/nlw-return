import { Router } from "express"
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from './adapters/implementations/nodemailer/nodemailer-mail-adapter'
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { BcryptHashAdapter } from "./adapters/implementations/hash/bcrypt-hash-adapter";
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { EnsureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ShowFeedbacksUseCase } from "./use-cases/show-feedbacks-use-case";
import { AuthenticateUserUseCase } from "./use-cases/authenticate-user-use-case";

const routes = Router()

const nodemailerMailAdapter = new NodemailerMailAdapter()
const bcryptHashAdapter = new BcryptHashAdapter()

const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
const prismaUsersRepository = new PrismaUsersRepository()

routes.post('/feedbacks', EnsureAuthenticated, async (req, res) => {
  const { type, comment, screenshot } = req.body

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    prismaUsersRepository,
    nodemailerMailAdapter,
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    creatorId: req.user.id,
    screenshot
  })

  return res.status(201).send()
})

routes.get('/feedbacks', EnsureAuthenticated, async (req, res) => {
  const { page } = req.query

  const showFeedbacks = new ShowFeedbacksUseCase(
    prismaFeedbacksRepository,
  )

  const feedbacks = await showFeedbacks.execute(page ? Number(page) : undefined)

  return res.json(feedbacks)
})

routes.post('/users', async (req, res) => {
  const { name, email, password } = req.body

  const createUser = new CreateUserUseCase(
    prismaUsersRepository,
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

routes.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const authenticateUser = new AuthenticateUserUseCase(
    prismaUsersRepository,
    bcryptHashAdapter,
  )

  const { token, user } = await authenticateUser.execute({
    email,
    password
  })

  const { password: _, ...userWithoutPassword } = user

  return res.json({
    token,
    user: userWithoutPassword,
  })
})

export { routes }