import { Feedback } from "../pages/Dashboard"

interface FeedbackItemProps {
  feedback: Feedback
}

export function FeedbackItem({ feedback }: FeedbackItemProps) {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg w-[100%] min-h-[32rem] h-88 p-4 flex flex-col justify-between">
      <header className="flex justify-between">
        <p className="text-zinc-500 dark:text-zinc-400">Por: {feedback.creator.name}</p>
        <p className="text-zinc-500 dark:text-zinc-400">Em: {feedback.formattedCreatedAt}</p>
      </header>

      {feedback.screenshot ? (
        <img
          src={feedback.screenshot}
          alt="screenshot taken from the app"
          className="mt-4 bg-cover aspect-video h-[100%]"
        />
      ) : (
        <div className="mt-4 bg-cover aspect-video h-[100%] flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl text-center text-zinc-800 dark:text-zinc-100">O usuário não tirou uma screenshot!</h1>
          <p className="mt-4 text-zinc-800 dark:text-zinc-100">Poxa! com screenshot fica tão mais bunitu 😢</p>
        </div>
      )}

      <p className="mt-4 text-zinc-800 dark:text-zinc-100">{feedback.comment}</p>
    </div>
  )
}