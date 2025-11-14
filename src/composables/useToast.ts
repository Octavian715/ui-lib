import { reactive } from 'vue'

export interface Toast {
  id: string
  title?: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  closable?: boolean
}

interface ToastOptions {
  title?: string
  message: string
  type?: Toast['type']
  duration?: number
  closable?: boolean
}

const toasts = reactive<Toast[]>([])

let idCounter = 0

function generateId(): string {
  return `toast-${++idCounter}-${Date.now()}`
}

export function useToast() {
  const add = (options: ToastOptions): string => {
    const id = generateId()
    const toast: Toast = {
      id,
      title: options.title,
      message: options.message,
      type: options.type || 'info',
      duration: options.duration ?? 5000,
      closable: options.closable ?? true,
    }

    toasts.push(toast)

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.splice(0, toasts.length)
  }

  const success = (message: string, title?: string, duration?: number) => {
    return add({ message, title, type: 'success', duration })
  }

  const error = (message: string, title?: string, duration?: number) => {
    return add({ message, title, type: 'error', duration })
  }

  const warning = (message: string, title?: string, duration?: number) => {
    return add({ message, title, type: 'warning', duration })
  }

  const info = (message: string, title?: string, duration?: number) => {
    return add({ message, title, type: 'info', duration })
  }

  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  }
}
