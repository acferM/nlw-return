import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleOnChange: (value: string) => void
  value: string
}

export function Input({ handleOnChange, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      onChange={(event) => handleOnChange(event.target.value)}
      className="w-38 p-2 rounded bg-zinc-200 dark:bg-zinc-700 border-0 mt-4 focus:outline-2 focus:outline-brand-300 focus:ring-0 transition-colors"
    />
  )
}