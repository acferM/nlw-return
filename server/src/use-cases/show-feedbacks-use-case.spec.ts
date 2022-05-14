import { FakeFeedbacksRepository } from "../repositories/fakes/fake-feedbacks-repository"
import { ShowFeedbacksUseCase } from "./show-feedbacks-use-case"

let fakeFeedbacksRepository: FakeFeedbacksRepository
let showFeedbacks: ShowFeedbacksUseCase

describe('Show Feedbacks Use Case', () => {
  beforeEach(() => {
    fakeFeedbacksRepository = new FakeFeedbacksRepository()
    showFeedbacks = new ShowFeedbacksUseCase(fakeFeedbacksRepository)
  })

  it('Should be able to list feedbacks', async () => {
    await fakeFeedbacksRepository.create({
      comment: 'fake comment',
      type: 'BUG',
    })

    const feedbacks = await showFeedbacks.execute()

    expect(feedbacks).toHaveLength(1)
  })

  it('Should be able to list feedbacks by page', async () => {
    for (let i = 0; i < 10; i++) {
      await fakeFeedbacksRepository.create({
        comment: `fake comment ${i}`,
        type: 'BUG',
      })
    }

    const feedbacks = await showFeedbacks.execute(2)

    expect(feedbacks).toHaveLength(1)
    expect(feedbacks[0].comment).toEqual('fake comment 9')
  })
})