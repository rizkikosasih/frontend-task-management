import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { CheckSquare, FolderGit2, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { Button } from '@/components/ui/Button'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { token, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/login' })
    }
  }, [token, navigate])

  const { projectsQuery } = useProjects({ per_page: 5 })
  const { tasksQuery } = useTasks({ per_page: 100 })

  const projects = projectsQuery.data?.data || []
  const tasks = tasksQuery.data?.data || []

  const todoCount = tasks.filter((t) => t.status === 'todo').length
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length
  const doneCount = tasks.filter((t) => t.status === 'done').length

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dasbor Ikhtisar
          </h1>
          <p className="text-sm text-slate-500">
            Selamat datang kembali, <span className="font-semibold text-slate-700">{user?.name}</span>. Pantau kemajuan pekerjaan tim Anda di sini.
          </p>
        </div>

        <Link to="/projects">
          <Button>
            <span>Buka Katalog Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Proyek
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {projectsQuery.data?.meta?.total ?? projects.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Perlu Dikerjakan
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{todoCount}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sedang Berjalan
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tugas Selesai
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{doneCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Proyek Aktif Terbaru</h2>
          <Link
            to="/projects"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Lihat semua proyek &rarr;
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">
            Belum ada proyek yang terdaftar.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div className="space-y-0.5">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: String(proj.id) }}
                    className="font-medium text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    {proj.name}
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {proj.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    {proj.tasks_count ?? 0} tugas
                  </span>
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: String(proj.id) }}
                  >
                    <Button variant="ghost" size="sm">
                      Buka Papan
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
