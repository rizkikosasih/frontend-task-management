import { create } from 'zustand'
import type { User } from '@/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  setUser: (user: User) => void
  clearAuth: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  setAuth: (user, token) => {
    localStorage.setItem('auth_token', token)
    set({ user, token })
  },
  setUser: (user) => {
    set({ user })
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token')
    set({ user: null, token: null })
  },
  isAdmin: () => {
    const roles = get().user?.roles || []
    return roles.includes('admin')
  },
}))
