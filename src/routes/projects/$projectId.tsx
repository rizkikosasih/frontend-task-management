import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Calendar, FolderGit2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useProjectDetail } from '@/features/projects/hooks/useProjects'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { useTaskStatusMutation } from '@/features/tasks/hooks/useTaskStatusMutation'
import { KanbanBoard } from '@/features/tasks/components/KanbanBoard'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { TaskDetailModal } from '@/features/tasks/components/TaskDetailModal'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/feedback/Toast'
import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '@/types/task'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const { projectId } = Route.useParams()
  const pId = Number(projectId)
  const { token, isAdmin } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/login' })
    }
  }, [token, navigate])

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [detailTask, setDetailTask] = useState<Task | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: projectRes, isLoading: isProjectLoading } = useProjectDetail(pId)
  const { tasksQuery, createTaskMutation, updateTaskMutation } = useTasks({
    project_id: pId,
    per_page: 100,
  })
  const statusMutation = useTaskStatusMutation(pId)

  const project = projectRes?.data
  const tasks = tasksQuery.data?.data || []

  function handleStatusChange(taskId: number, newStatus: TaskStatus) {
    setErrorMessage(null)
    statusMutation.mutate(
      { id: taskId, status: newStatus },
      {
        onError: (err) => {
          setErrorMessage(
            err instanceof Error
              ? err.message
              : 'Gagal memperbarui status tugas. Perubahan dibatalkan oleh proteksi konkurensi.'
          )
        },
      }
    )
  }

  function handleTaskSubmit(payload: CreateTaskPayload | UpdateTaskPayload) {
    if (selectedTask) {
      updateTaskMutation.mutate(
        { id: selectedTask.id, payload: payload as UpdateTaskPayload },
        {
          onSuccess: () => {
            setIsTaskModalOpen(false)
            setSelectedTask(null)
          },
        }
      )
    } else {
      createTaskMutation.mutate(payload as CreateTaskPayload, {
        onSuccess: () => {
          setIsTaskModalOpen(false)
        },
      })
    }
  }

  if (isProjectLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded" />
        <div className="h-32 bg-slate-200 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <FolderGit2 className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Proyek Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">
          Proyek mungkin telah dihapus atau Anda tidak memiliki hak akses.
        </p>
        <Link to="/projects">
          <Button variant="secondary">Kembali ke Katalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {project.name}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              {project.description || 'Tidak ada deskripsi rinci.'}
            </p>
            {project.created_at && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Dibuat: {project.created_at}</span>
              </div>
            )}
          </div>

          {isAdmin() && (
            <Button
              onClick={() => {
                setSelectedTask(null)
                setIsTaskModalOpen(true)
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tugas</span>
            </Button>
          )}
        </div>
      </div>

      {errorMessage && (
        <Toast
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <KanbanBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onTaskClick={(task) => setDetailTask(task)}
        onAddTask={
          isAdmin()
            ? () => {
                setSelectedTask(null)
                setIsTaskModalOpen(true)
              }
            : undefined
        }
        canAddTask={isAdmin()}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        projectId={pId}
        onSubmit={handleTaskSubmit}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
      />

      <TaskDetailModal
        task={detailTask}
        isOpen={!!detailTask}
        onClose={() => setDetailTask(null)}
      />
    </div>
  )
}
