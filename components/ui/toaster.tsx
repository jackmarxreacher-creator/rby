"use client"

import * as React from "react"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  // ✅ no argument
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, duration, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex-1 min-w-0">
            {title && <ToastTitle className="truncate">{title}</ToastTitle>}
            {description && <ToastDescription className="truncate">{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
          {/* progress bar */}
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/20">
            <ProgressBar duration={duration ?? 4000} />
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

function ProgressBar({ duration }: { duration: number }) {
  const [width, setWidth] = React.useState(100)

  React.useEffect(() => {
    // start the shrink on the next tick so the transition animates
    const t = setTimeout(() => setWidth(0), 10)
    return () => clearTimeout(t)
  }, [duration])

  return (
    <div
      aria-hidden
      className="h-1 bg-white"
      style={{ width: `${width}%`, transition: `width ${duration}ms linear` }}
    />
  )
}