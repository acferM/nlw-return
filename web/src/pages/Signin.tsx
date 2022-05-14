// type Feedback = {
//   id: string
//   type: FeedbackType
//   comment: string
//   screenshot: string
//   createdAt: Date
//   creator: {
//     name: string
//   }
// }

import { FormEvent, useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { api } from "../libs/api"

export function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  const navigate = useNavigate()

  const handleSignIn = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    await signIn(email, password)

    navigate('/dashboard')
  }, [email, password])

  return (
    <div className="w-[100%] h-[90vh] flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="p-8 flex flex-col items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-colors"
      >
        <h1 className="text-zinc-800 dark:text-zinc-100 font-bold text-2xl transition-colors">Faça login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-38 p-2 rounded bg-zinc-200 dark:bg-zinc-700 border-0 mt-4 focus:outline-2 focus:outline-brand-300 focus:ring-0 transition-colors"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-38 p-2 rounded bg-zinc-200 dark:bg-zinc-700 border-0 mt-4 focus:outline-2 focus:outline-brand-300 focus:ring-0 transition-colors"
        />

        <button
          type="submit"
          disabled={!email && !password}
          className="mt-4 p-2 rounded bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 focus:outline-2 focus:outline-brand-300 focus:ring-0 focus:border-0 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-300 disabled:dark:hover:bg-zinc-700"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center text-zinc-500 dark:text-zinc-400 transition-color">Não é cadastrado ?
          <br />
          <Link
            to="/signup"
            className="underline underline-offset-1 hover:text-brand-500 transition-color"
          >
            Fazer cadastro
          </Link>
        </p>
      </form>
    </div>
  )
}