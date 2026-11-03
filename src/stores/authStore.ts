import { create } from 'zustand'
import type { User } from '@/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  setAuth: (user, token) => {
    localStorage.setItem('auth_token', token)
    set({ user, token })
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token')
    set({ user: null, token: null })
  },
}))
