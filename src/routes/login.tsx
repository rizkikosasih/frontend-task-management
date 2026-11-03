import { createFileRoute } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-2">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Masuk ke Akun</h2>
        <p className="text-sm text-slate-500">
          Gunakan kredensial akun lokal atau hubungkan melalui penyedia identitas OAuth2
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"
        >
          Masuk
        </button>
      </div>
    </div>
  )
}
