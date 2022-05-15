import { Feedback } from "../pages/Dashboard";
import { FeedbackItem } from "./FeedbackItem";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <main className="grid grid-cols-3 gap-6 w-[100%]">
      {feedbacks.map(feedback => <FeedbackItem feedback={feedback} />)}
    </main>
  )
}