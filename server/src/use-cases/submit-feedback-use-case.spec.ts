import { AppError } from "../errors/AppError"
import { FakeUsersRepository } from "../repositories/fakes/fake-users-repository"
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

let fakeUsersRepository: FakeUsersRepository

let submitFeedback: SubmitFeedbackUseCase

describe('Submit Feedback Use Case', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy, findAll: jest.fn() },
      fakeUsersRepository,
      { sendMail: sendMailSpy },
    )
  })

  it('should be able to submit feedback', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,1sdfg980',
      creatorId: user.id,
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be able to submit feedback without screenshot', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      creatorId: user.id,
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit with inexistent user', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,1sdfg980',
      creatorId: 'fake-user-id'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to submit feedback with invalid screenshot', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
      creatorId: user.id,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to submit feedback without type', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,1sdfg980',
      creatorId: user.id,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to submit feedback without comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'fake@email.com',
      password: '123456'
    })

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,1sdfg980',
      creatorId: user.id,
    })).rejects.toBeInstanceOf(AppError)
  })
})