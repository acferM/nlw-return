import { FormEvent, useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Input } from "../components/Input"
import { Loading } from "../components/Loading"
import { useAuth } from "../hooks/useAuth"
import { api } from "../libs/api"

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const { signIn } = useAuth()

  const navigate = useNavigate()

  const handleSignup = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    setIsRegistering(true)

    try {
      await api.post('/users', {
        name,
        email,
        password,
      })

      await signIn(email, password)

      setIsRegistering(false)

      navigate('/dashboard')
    } catch (error) {
      toast.error('Não foi possível realizar o cadastro, tente novamente!')

      setIsRegistering(false)
    }
  }, [name, email, password])

  return (
    <div className="w-[100%] h-[90vh] flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="p-8 flex flex-col items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-colors"
      >
        <h1 className="text-zinc-800 dark:text-zinc-100 font-bold text-2xl transition-colors">Faça seu cadastro</h1>

        <Input
          type="text"
          placeholder="Nome"
          value={name}
          handleOnChange={setName}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          handleOnChange={setEmail}
          className="w-38 p-2 rounded bg-zinc-200 dark:bg-zinc-700 border-0 mt-4 focus:outline-2 focus:outline-brand-300 focus:ring-0 transition-colors"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          handleOnChange={setPassword}
        />

        <button
          type="submit"
          disabled={!name || !email || !password}
          className="mt-4 p-2 rounded bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 focus:outline-2 focus:outline-brand-300 focus:ring-0 focus:border-0 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-200 disabled:dark:hover:bg-zinc-700"
        >
          {isRegistering ? <Loading /> : 'Cadastrar'}
        </button>

        <p className="mt-4 text-sm text-center text-zinc-500 dark:text-zinc-400 transition-color">Já tem uma conta ?
          <br />
          <Link
            to="/"
            className="underline underline-offset-1 hover:text-brand-500 transition-color"
          >
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  )
}