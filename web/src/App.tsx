import { ToastContainer } from "react-toastify"
import { ThemeSwitcher } from "./components/ThemeSwitcher"
import { Widget } from "./components/Widget"
import { AuthContextProvider } from "./context/auth"
import { Routes } from "./routes"
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <AuthContextProvider>
      <div className="flex w-[100%] min-h-[100vh] p-4 bg-white dark:bg-[#09090A] text-zinc-800 dark:text-zinc-100 transition-colors">
        <Routes />
        <ThemeSwitcher />
        <Widget />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
      />
    </AuthContextProvider>
  )
}