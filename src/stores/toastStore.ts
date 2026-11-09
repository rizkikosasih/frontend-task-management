import { create } from 'zustand'

export interface ToastData {
  id: string
  type: 'success' | 'error'
  message: string
}

export interface ShowToastOptions {
  type?: 'success' | 'error'
  message: string
  duration?: number
}

interface ToastState {
  toast: ToastData | null
  timerId: NodeJS.Timeout | null
  showToast: (options: ShowToastOptions) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set, get) => ({
  toast: null,
  timerId: null,
  showToast: ({ type = 'success', message, duration = 5000 }) => {
    const prevTimer = get().timerId
    if (prevTimer) {
      clearTimeout(prevTimer)
    }

    const id = crypto.randomUUID()
    const timerId =
      duration > 0
        ? setTimeout(() => {
            if (get().toast?.id === id) {
              set({ toast: null, timerId: null })
            }
          }, duration)
        : null

    set({
      toast: { id, type, message },
      timerId,
    })
  },
  hideToast: () => {
    const prevTimer = get().timerId
    if (prevTimer) {
      clearTimeout(prevTimer)
    }
    set({ toast: null, timerId: null })
  },
}))
