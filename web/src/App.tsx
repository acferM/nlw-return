import { ThemeSwitcher } from "./components/ThemeSwitcher"
import { Widget } from "./components/Widget"

export function App() {
  return (
    <div className="flex w-[100%] h-[100vh] bg-white dark:bg-[#09090A] text-zinc-800 dark:text-zinc-100 transition-colors">
      <ThemeSwitcher />

      <Widget />
    </div>
  )
}