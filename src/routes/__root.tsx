import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, LogIn, CheckSquare, FolderGit2, LogOut, User, UserPlus } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { Badge } from '@/components/ui/Badge'
import { logoutApi } from '@/api/endpoints/auth'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { user, token, clearAuth } = useAuthStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
    } finally {
      clearAuth()
      queryClient.clear()
      navigate({ to: '/login' })
    }
  }

  const role = user?.roles?.[0] || 'member'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Task Management</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors py-1 px-2 rounded-md hover:bg-slate-50"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Beranda</span>
            </Link>

            {token && (
              <>
                <Link
                  to="/projects"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors py-1 px-2 rounded-md hover:bg-slate-50"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Proyek</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors py-1 px-2 rounded-md hover:bg-slate-50"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Dasbor</span>
                </Link>
              </>
            )}

            <div className="h-4 w-px bg-slate-200 mx-1" />

            {token && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 leading-tight">
                      {user.name}
                    </span>
                    <Badge variant={role === 'admin' ? 'admin' : 'member'} className="text-[10px] px-1.5 py-0 mt-0.5">
                      {role}
                    </Badge>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Keluar Akun"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors py-1.5 px-3 rounded-lg shadow-2xs font-medium text-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
