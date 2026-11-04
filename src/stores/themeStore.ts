import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: ThemeMode) => void
}

function getSafeStorageItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
  } catch {}
  return null
}

function setSafeStorageItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    }
  } catch {}
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeClass(resolved: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (resolved === 'dark') {
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
  } else {
    root.classList.remove('dark')
    root.style.colorScheme = 'light'
  }
}

export const useThemeStore = create<ThemeState>((set) => {
  const stored = getSafeStorageItem('app_theme')
  const initialTheme: ThemeMode =
    stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  const resolved = initialTheme === 'system' ? getSystemTheme() : initialTheme
  applyThemeClass(resolved)

  return {
    theme: initialTheme,
    resolvedTheme: resolved,
    setTheme: (theme: ThemeMode) => {
      setSafeStorageItem('app_theme', theme)
      const nextResolved = theme === 'system' ? getSystemTheme() : theme
      applyThemeClass(nextResolved)
      set({ theme, resolvedTheme: nextResolved })
    },
  }
})

let isWatcherInitialized = false

export function initializeThemeWatcher(): () => void {
  if (typeof window === 'undefined' || isWatcherInitialized) return () => {}
  isWatcherInitialized = true

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleMediaChange = (e: MediaQueryListEvent) => {
    const { theme } = useThemeStore.getState()
    if (theme === 'system') {
      const resolved = e.matches ? 'dark' : 'light'
      applyThemeClass(resolved)
      useThemeStore.setState({ resolvedTheme: resolved })
    }
  }

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'app_theme') {
      const next = e.newValue as ThemeMode | null
      const validTheme: ThemeMode =
        next === 'light' || next === 'dark' || next === 'system' ? next : 'system'
      const resolved = validTheme === 'system' ? getSystemTheme() : validTheme
      applyThemeClass(resolved)
      useThemeStore.setState({ theme: validTheme, resolvedTheme: resolved })
    }
  }

  mediaQuery.addEventListener('change', handleMediaChange)
  window.addEventListener('storage', handleStorageChange)

  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange)
    window.removeEventListener('storage', handleStorageChange)
    isWatcherInitialized = false
  }
}
