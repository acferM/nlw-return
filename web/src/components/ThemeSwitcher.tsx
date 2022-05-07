import { Moon, SunDim } from "phosphor-react";
import { useCallback, useState } from "react";

export function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggleDarkMode = useCallback(() => {
    if (!isDarkMode) {
      document.querySelector('html')!.classList.add('dark')
      setIsDarkMode(prevState => !prevState)
      return;
    }

    document.querySelector('html')!.classList.remove('dark')

    setIsDarkMode(prevState => !prevState)
  }, [isDarkMode])

  return (
    <button
      onClick={handleToggleDarkMode}
      className="absolute top-4 right-4 text-brand-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-full flex items-center justify-center transition-colors"
    >
      {isDarkMode ? <SunDim weight="bold" className="w-8 h-8" /> : <Moon weight="bold" className="w-8 h-8" />}
    </button>
  )
}