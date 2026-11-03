import { Calendar, User, CheckSquare } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import type { Task } from '@/types/task'
import { useComments } from '@/features/comments/hooks/useComments'
import { CommentList } from '@/features/comments/components/CommentList'
import { CommentForm } from '@/features/comments/components/CommentForm'

export interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
  const taskId = task?.id ?? 0
  const {
    commentsQuery,
    createCommentMutation,
    deleteCommentMutation,
  } = useComments(taskId)

  if (!task) return null

  const comments = commentsQuery.data?.data || []
  const assigneeName = typeof task.assigned_to === 'object' ? task.assigned_to?.name : null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rincian Tugas & Linimasa Diskusi">
      <div className="space-y-6">
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-3">
            <Badge variant={task.status}>{task.status.replace('_', ' ')}</Badge>
            {task.due_date && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Tenggat: {task.due_date}</span>
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {task.title}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {task.description || 'Tidak ada deskripsi rinci.'}
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <User className="w-3.5 h-3.5 text-indigo-500" />
            <span>Penerima Tugas: </span>
            <span className="font-medium text-slate-700">
              {assigneeName || 'Belum ditugaskan'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Linimasa Komentar</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600">
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
