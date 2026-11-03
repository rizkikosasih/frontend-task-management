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
      <div className="py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
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
            className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px]">
                  <User className="w-3 h-3" />
                </div>
                <span>{authorName}</span>
                {comment.created_at && (
                  <span className="text-slate-400 font-normal">· {comment.created_at}</span>
                )}
              </div>

              {isOwner && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={isDeleting}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded"
                  title="Hapus Komentar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap pl-6.5">
              {comment.message}
            </p>
          </div>
        )
      })}
    </div>
  )
}
