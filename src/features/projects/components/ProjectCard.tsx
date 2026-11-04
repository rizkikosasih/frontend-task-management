import { Link } from '@tanstack/react-router'
import { FolderGit2, Calendar, CheckCircle, Edit, Trash2 } from 'lucide-react'
import type { Project } from '@/types/project'
import { useAuthStore } from '@/stores/authStore'

export interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { user } = useAuthStore()

  const creatorId = typeof project.created_by === 'object' ? project.created_by?.id : project.created_by
  const creatorName = typeof project.created_by === 'object' ? project.created_by?.name : null
  const isOwner = user?.id === creatorId

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle text-primary-accent flex items-center justify-center shrink-0 border border-border">
            <FolderGit2 className="w-5 h-5" />
          </div>
          {isOwner && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-subtle rounded-md transition-colors"
                  title="Edit Proyek"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  className="p-1.5 text-foreground-muted hover:text-rose-500 hover:bg-surface-subtle rounded-md transition-colors"
                  title="Hapus Proyek"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        <Link
          to="/projects/$projectId"
          params={{ projectId: String(project.id) }}
          className="block group"
        >
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary-accent transition-colors line-clamp-1">
            {project.name}
          </h3>
        </Link>

        <p className="text-sm text-foreground-muted line-clamp-2 min-h-[40px]">
          {project.description || 'Tidak ada deskripsi rinci untuk proyek ini.'}
        </p>
      </div>

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-foreground-muted">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{project.tasks_count ?? 0} Tugas</span>
        </div>
        {creatorName && <span>Oleh {creatorName}</span>}
        {project.created_at && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-foreground-muted" />
            <span>{project.created_at}</span>
          </div>
        )}
      </div>
    </div>
  )
}

