import { Trash2, User } from 'lucide-react'
import type { Comment } from '@/types/comment'
import { useAuthStore } from '@/stores/authStore'

export interface CommentListProps {
  comments: Comment[]
  onDelete?: (id: number) => void
  isDeleting?: boolean
}

export function CommentList({ comments, onDelete, isDeleting = false }: CommentListProps) {
  const { user } = useAuthStore()

  if (comments.length === 0) {
    return (
      <div className="py-6 text-center text-xs text-foreground-muted border border-dashed border-border rounded-lg">
        Belum ada komentar untuk tugas ini.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const isOwner = user?.id === comment.user_id
        const authorName = comment.user?.name || 'Pengguna'

        return (
          <div
            key={comment.id}
            className="p-3.5 rounded-lg bg-surface-subtle border border-border space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <div className="w-5 h-5 rounded-full bg-surface text-primary-accent border border-border flex items-center justify-center text-[10px]">
                  <User className="w-3 h-3" />
                </div>
                <span>{authorName}</span>
                {comment.created_at && (
                  <span className="text-foreground-muted font-normal">· {comment.created_at}</span>
                )}
              </div>

              {isOwner && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={isDeleting}
                  className="text-foreground-muted hover:text-rose-500 transition-colors p-1 rounded"
                  title="Hapus Komentar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-foreground-muted leading-relaxed whitespace-pre-wrap pl-6.5">
              {comment.message}
            </p>
          </div>
        )
      })}
    </div>
  )
}

