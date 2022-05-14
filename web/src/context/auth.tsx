import { createContext, useCallback, useState } from "react";
import { api } from "../libs/api";

type User = {
  id: string;
  name: string;
}

interface AuthContextData {
  user: User;
  token: string
  signIn(email: string, password: string): Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [token, setToken] = useState('')

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await api.post('/signin', {
      email,
      password,
    })

    const { user, token } = response.data

    setUser(user)
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}