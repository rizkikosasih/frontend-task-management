import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, User, GripVertical } from 'lucide-react'
import type { Task } from '@/types/task'
import { Badge } from '@/components/ui/Badge'

export interface TaskCardProps {
  task: Task
  onClick?: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const isDone = task.status === 'done'

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: isDone,
    data: {
      task,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  const assigneeName = typeof task.assigned_to === 'object' ? task.assigned_to?.name : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-surface rounded-lg border border-border p-4 shadow-2xs hover:shadow-sm transition-all space-y-3 cursor-pointer ${
        isDragging ? 'opacity-40 ring-2 ring-primary ring-offset-2' : ''
      }`}
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-foreground text-sm leading-snug line-clamp-2">
          {task.title}
        </h4>
        {!isDone && (
          <button
            type="button"
            className="cursor-grab text-foreground-muted hover:text-foreground p-0.5 rounded touch-none"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-4 h-4" />
          </button>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs text-foreground-muted">
        <div className="flex items-center gap-2">
          {assigneeName ? (
            <div className="flex items-center gap-1 text-foreground font-medium">
              <User className="w-3.5 h-3.5 text-primary-accent" />
              <span>{assigneeName}</span>
            </div>
          ) : (
            <span className="text-foreground-muted">Belum ditugaskan</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {task.due_date && (
            <div className="flex items-center gap-1 text-foreground-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{task.due_date}</span>
            </div>
          )}
          <Badge variant={task.status}>{task.status.replace('_', ' ')}</Badge>
        </div>
      </div>
    </div>
  )
}
