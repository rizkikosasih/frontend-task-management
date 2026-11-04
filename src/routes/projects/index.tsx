import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Plus, Search, FolderGit2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { ProjectModal } from '@/features/projects/components/ProjectModal'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/project'

export const Route = createFileRoute('/projects/')({
  component: ProjectsPage,
})

function ProjectsPage() {
  const { token, isAdmin } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/login' })
    }
  }, [token, navigate])

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const {
    projectsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useProjects({
    search: search || undefined,
    page,
    per_page: 9,
  })

  const projects = projectsQuery.data?.data || []
  const meta = projectsQuery.data?.meta

  function handleCreateOrUpdate(values: { name: string; description?: string }) {
    if (selectedProject) {
      updateMutation.mutate(
        { id: selectedProject.id, payload: values },
        {
          onSuccess: () => {
            setIsModalOpen(false)
            setSelectedProject(null)
          },
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          setIsModalOpen(false)
        },
      })
    }
  }

  function handleEdit(project: Project) {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  function handleDelete(project: Project) {
    if (window.confirm(`Hapus proyek "${project.name}" beserta seluruh tugas di dalamnya?`)) {
      deleteMutation.mutate(project.id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Katalog Proyek</h1>
          <p className="text-sm text-foreground-muted">
            Daftar proyek kolaboratif dan papan kanban tim Anda
          </p>
        </div>

        {isAdmin() && (
          <Button
            onClick={() => {
              setSelectedProject(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Buat Proyek Baru</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Cari berdasarkan nama proyek..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-surface text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      {projectsQuery.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-surface-subtle animate-pulse border border-border" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-border rounded-xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-surface-subtle text-foreground-muted flex items-center justify-center mx-auto border border-border">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground">Tidak ada proyek ditemukan</h3>
          <p className="text-sm text-foreground-muted max-w-sm mx-auto">
            {search
              ? 'Tidak ada proyek yang cocok dengan kata kunci pencarian.'
              : 'Belum ada proyek yang terdaftar. Mulai buat proyek baru untuk kolaborasi.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={isAdmin() ? handleEdit : undefined}
              onDelete={isAdmin() ? handleDelete : undefined}
            />
          ))}
        </div>
      )}

      {meta && (meta.last_page || 1) > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-border text-sm">
          <span className="text-foreground-muted">
            Halaman {meta.current_page} dari {meta.last_page} ({meta.total} proyek)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Sebelumnya
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= (meta.last_page || 1)}
              onClick={() => setPage((p) => p + 1)}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
        onSubmit={handleCreateOrUpdate}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  )
}

