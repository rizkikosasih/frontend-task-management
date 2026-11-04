import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import {
  LayoutDashboard,
  LogIn,
  CheckSquare,
  FolderGit2,
  LogOut,
  User,
  UserPlus,
  Menu,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Badge } from '@/components/ui/Badge'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { logoutApi } from '@/api/endpoints/auth'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { user, token, clearAuth } = useAuthStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsDrawerOpen(false)
    }
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen])

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
    } finally {
      clearAuth()
      queryClient.clear()
      setIsDrawerOpen(false)
      navigate({ to: '/login' })
    }
  }

  const role = user?.roles?.[0] || 'member'

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-150">
      <header className="border-b border-border bg-surface sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs group-hover:bg-primary-hover transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              Task Management
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-foreground-muted hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-subtle"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Beranda</span>
            </Link>

            {token && (
              <>
                <Link
                  to="/projects"
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-subtle"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Proyek</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-subtle"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Dasbor</span>
                </Link>
              </>
            )}

            <div className="h-4 w-px bg-border mx-1" />

            <ThemeToggle />

            {token && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-surface-subtle text-foreground flex items-center justify-center text-xs font-bold border border-border">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {user.name}
                    </span>
                    <Badge
                      variant={role === 'admin' ? 'admin' : 'member'}
                      className="text-[10px] px-1.5 py-0 mt-0.5"
                    >
                      {role}
                    </Badge>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-rose-500 hover:bg-surface-subtle transition-colors"
                  title="Keluar Akun"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-subtle"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 text-primary-foreground bg-primary hover:bg-primary-hover transition-colors py-1.5 px-3 rounded-lg shadow-2xs font-medium text-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar</span>
                </Link>
              </div>
            )}
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors"
              title="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 w-72 max-w-[80vw] bg-surface border-l border-border shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto transform transition-transform animate-in slide-in-from-right duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="font-bold text-base tracking-tight text-foreground">
                    Menu Navigasi
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                    title="Tutup Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1 text-sm font-medium">
                  <Link
                    to="/"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-surface-subtle transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-foreground-muted" />
                    <span>Beranda</span>
                  </Link>

                  {token && (
                    <>
                      <Link
                        to="/projects"
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-surface-subtle transition-colors"
                      >
                        <FolderGit2 className="w-4 h-4 text-foreground-muted" />
                        <span>Proyek</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-surface-subtle transition-colors"
                      >
                        <CheckSquare className="w-4 h-4 text-foreground-muted" />
                        <span>Dasbor</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                {token && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-9 h-9 rounded-full bg-surface-subtle text-foreground flex items-center justify-center font-bold border border-border">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-foreground">{user.name}</span>
                        <span className="text-xs text-foreground-muted">{user.email}</span>
                        <Badge
                          variant={role === 'admin' ? 'admin' : 'member'}
                          className="text-[10px] w-fit mt-1"
                        >
                          {role}
                        </Badge>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-border text-foreground hover:bg-surface-subtle text-sm font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Masuk</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Daftar</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
