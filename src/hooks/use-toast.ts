import { useState } from 'react'

interface Toast {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    const newToast = { title, description, variant }
    setToasts(prev => [...prev, newToast])
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== newToast))
    }, 3000)
  }

  const dismiss = (toastToRemove: Toast) => {
    setToasts(prev => prev.filter(t => t !== toastToRemove))
  }

  return {
    toast,
    dismiss,
    toasts
  }
}
