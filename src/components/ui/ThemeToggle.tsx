import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore, ThemeMode } from '@/stores/themeStore'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Terang', icon: Sun },
    { value: 'dark', label: 'Gelap', icon: Moon },
    { value: 'system', label: 'Sistem', icon: Monitor },
  ]

  return (
    <div className="flex items-center rounded-lg border border-border bg-surface-subtle p-0.5">
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-surface text-foreground shadow-2xs font-semibold'
                : 'text-foreground-muted hover:text-foreground'
            }`}
            title={`Mode tampilan ${label}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
