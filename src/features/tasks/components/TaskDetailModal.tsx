import { Calendar, User, CheckSquare } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import type { Task, TaskStatus } from '@/types/task'
import { useComments } from '@/features/comments/hooks/useComments'
import { CommentList } from '@/features/comments/components/CommentList'
import { CommentForm } from '@/features/comments/components/CommentForm'

export interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (taskId: number, newStatus: TaskStatus) => void
  isUpdatingStatus?: boolean
}

const STATUS_OPTIONS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

export function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onStatusChange,
  isUpdatingStatus,
}: TaskDetailModalProps) {
  const taskId = task?.id ?? 0
  const { commentsQuery, createCommentMutation, deleteCommentMutation } = useComments(taskId)

  if (!task) return null

  const comments = commentsQuery.data?.data || []
  const assigneeName = typeof task.assigned_to === 'object' ? task.assigned_to?.name : null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rincian Tugas & Linimasa Diskusi">
      <div className="space-y-6">
        <div className="space-y-3 pb-4 border-b border-border-subtle">
          <div className="flex items-center justify-between gap-3">
            <Badge variant={task.status}>{task.status.replace('_', ' ')}</Badge>
            {task.due_date && (
              <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>Tenggat: {task.due_date}</span>
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-foreground leading-snug">{task.title}</h2>

          <p className="text-sm text-foreground-muted leading-relaxed whitespace-pre-wrap">
            {task.description || 'Tidak ada deskripsi rinci.'}
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-foreground-muted">
            <User className="w-3.5 h-3.5 text-primary-accent" />
            <span>Penerima Tugas: </span>
            <span className="font-medium text-foreground">
              {assigneeName || 'Belum ditugaskan'}
            </span>
          </div>

          {onStatusChange && (
            <div className="pt-2 space-y-1.5">
              <span className="text-xs font-medium text-foreground-muted">Ubah Status Tugas:</span>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((opt) => {
                  const isActive = task.status === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isActive || isUpdatingStatus}
                      onClick={() => onStatusChange(task.id, opt.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary cursor-default shadow-xs'
                          : 'bg-surface-subtle text-foreground border-border hover:border-primary-accent hover:text-primary-accent active:scale-95 disabled:opacity-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-primary-accent" />
            <h3 className="font-semibold text-foreground text-sm">Linimasa Komentar</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-subtle font-bold text-foreground-muted border border-border">
              {comments.length}
            </span>
          </div>

          <CommentList
            comments={comments}
            onDelete={(commentId) => deleteCommentMutation.mutate(commentId)}
            isDeleting={deleteCommentMutation.isPending}
          />

          <div className="pt-2">
            <CommentForm
              onSubmit={(message) => createCommentMutation.mutate({ message })}
              isLoading={createCommentMutation.isPending}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
