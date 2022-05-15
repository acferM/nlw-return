import { FormEvent, useCallback, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Input } from "../components/Input"
import { Loading } from "../components/Loading"
import { useAuth } from "../hooks/useAuth"

export function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigninIn] = useState(false)

  const { signIn } = useAuth()

  const navigate = useNavigate()

  const handleSignIn = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    setIsSigninIn(true)

    try {
      await signIn(email, password)

      setIsSigninIn(false)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Não foi possível realizar o login, verifique se seu email e senha estão corretos!')

      setIsSigninIn(false)
    }
  }, [email, password])

  return (
    <div className="w-[100%] h-[90vh] flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="p-8 flex flex-col items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-colors"
      >
        <h1 className="text-zinc-800 dark:text-zinc-100 font-bold text-2xl transition-colors">Faça login</h1>

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
          disabled={!email || !password}
          className="mt-4 p-2 rounded bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 focus:outline-2 focus:outline-brand-300 focus:ring-0 focus:border-0 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-300 disabled:dark:hover:bg-zinc-700"
        >
          {isSigningIn ? <Loading /> : 'Entrar'}
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