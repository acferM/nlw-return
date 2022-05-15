import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackList } from "../components/FeedbackList";
import { Loading } from "../components/Loading";
import { FeedbackType } from "../components/WidgetForm";
import { useAuth } from "../hooks/useAuth";
import { api } from "../libs/api";

type RequestFeedback = {
  id: string
  type: FeedbackType
  comment: string
  screenshot: string
  createdAt: Date
  creator: {
    name: string
  }
}

export type Feedback = {
  id: string
  type: FeedbackType
  comment: string
  screenshot: string
  createdAt: Date
  formattedCreatedAt: string
  creator: {
    name: string
  }
}

export function Dashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false)

  const { token } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    async function loadFeedbacks() {
      setIsLoadingFeedbacks(true)

      const response = await api.get<RequestFeedback[]>(`/feedbacks?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const formattedFeedbacks = response.data.map(feedback => ({
        ...feedback,
        formattedCreatedAt: new Date(feedback.createdAt).toLocaleDateString(
          'pt-br',
          {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }
        )
      }))

      if (page === 1) {
        setFeedbacks(formattedFeedbacks)
      } else {
        setFeedbacks(prevFeedbacks => [...prevFeedbacks, ...formattedFeedbacks])
      }

      setIsLoadingFeedbacks(false)

      if (response.data.length < 9) {
        setHasNextPage(false)
      }
    }

    if (hasNextPage) {
      loadFeedbacks()
    }
  }, [page])

  return (
    <div className="w-[100%] py-2 px-20">
      <FeedbackList feedbacks={feedbacks} />

      <footer className="mt-4 py-2 flex justify-center">
        <button
          type="submit"
          disabled={!hasNextPage || isLoadingFeedbacks}
          onClick={() => setPage(prevPage => prevPage + 1)}
          className="py-4 px-8 rounded font-bold bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 focus:outline-2 focus:outline-brand-300 focus:ring-0 focus:border-0 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-300 disabled:dark:hover:bg-zinc-700"
        >
          {isLoadingFeedbacks ? <Loading /> : 'Carregar mais'}
        </button>
      </footer>
    </div>
  )
}