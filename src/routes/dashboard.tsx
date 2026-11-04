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
      <div className="pb-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dasbor Ikhtisar
          </h1>
          <p className="text-sm text-foreground-muted">
            Selamat datang kembali, <span className="font-semibold text-foreground">{user?.name}</span>. Pantau kemajuan pekerjaan tim Anda di sini.
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
        <div className="bg-surface p-5 rounded-xl border border-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
              Total Proyek
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-subtle text-primary-accent flex items-center justify-center border border-border">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {projectsQuery.data?.meta?.total ?? projects.length}
          </div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
              Perlu Dikerjakan
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-subtle text-foreground-muted flex items-center justify-center border border-border">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{todoCount}</div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
              Sedang Berjalan
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{inProgressCount}</div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
              Tugas Selesai
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{doneCount}</div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Proyek Aktif Terbaru</h2>
          <Link
            to="/projects"
            className="text-xs font-medium text-primary-accent hover:underline"
          >
            Lihat semua proyek &rarr;
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-foreground-muted py-6 text-center">
            Belum ada proyek yang terdaftar.
          </p>
        ) : (
          <div className="divide-y divide-border-subtle">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="py-3.5 flex items-center justify-between hover:bg-surface-subtle px-2 rounded-lg transition-colors"
              >
                <div className="space-y-0.5">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: String(proj.id) }}
                    className="font-medium text-sm text-foreground hover:text-primary-accent transition-colors"
                  >
                    {proj.name}
                  </Link>
                  <p className="text-xs text-foreground-muted line-clamp-1">
                    {proj.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground-muted">
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

