import { ThemeSwitcher } from "./components/ThemeSwitcher"
import { Widget } from "./components/Widget"
import { AuthContextProvider } from "./context/auth"
import { Routes } from "./routes"

export function App() {
  return (
    <AuthContextProvider>
      <div className="flex w-[100%] h-[100vh] p-4 bg-white dark:bg-[#09090A] text-zinc-800 dark:text-zinc-100 transition-colors">
        <Routes />
        <ThemeSwitcher />
        <Widget />
      </div>
    </AuthContextProvider>
  )
}