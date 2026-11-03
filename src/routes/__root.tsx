import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { LayoutDashboard, LogIn, CheckSquare } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-lg tracking-tight">Task Management</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link to="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              <span>Beranda</span>
            </Link>
            <Link to="/login" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
