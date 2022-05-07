import { useCallback, useState } from "react";
import html2canvas from 'html2canvas'
import { Camera, Trash } from "phosphor-react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({
  screenshot,
  onScreenshotTook
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenShot] = useState(false)

  const handleTakeScreenshot = useCallback(async () => {
    setIsTakingScreenShot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTook(base64image)

    setIsTakingScreenShot(false)
  }, [])

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom', // to test this app
          backgroundSize: 180, // to test this app
        }}
        className="p-1 w-10 h10 rounded-md border-transparent flex justify-end items-end text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors border-[1px] border-zinc-300 dark:border-zinc-600"
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />}
    </button>
  )
}