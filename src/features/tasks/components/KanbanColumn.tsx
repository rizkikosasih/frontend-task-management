import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import type { Task, TaskStatus } from '@/types/task'
import { TaskCard } from './TaskCard'

export interface KanbanColumnProps {
  id: TaskStatus
  title: string
  tasks: Task[]
  onTaskClick?: (task: Task) => void
  onAddTask?: (status: TaskStatus) => void
  canAddTask?: boolean
}

export function KanbanColumn({
  id,
  title,
  tasks,
  onTaskClick,
  onAddTask,
  canAddTask = false,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      status: id,
    },
  })

  const columnColors = {
    todo: 'border-border bg-surface-subtle/70',
    in_progress: 'border-amber-500/30 bg-amber-500/5',
    done: 'border-emerald-500/30 bg-emerald-500/5',
  }

  const badgeColors = {
    todo: 'bg-surface text-foreground-muted border border-border',
    in_progress: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    done: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border p-4 min-h-[500px] w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center md:snap-align-none transition-colors ${
        columnColors[id]
      } ${isOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-sm tracking-wide">{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeColors[id]}`}>
            {tasks.length}
          </span>
        </div>
        {canAddTask && onAddTask && (
          <button
            type="button"
            onClick={() => onAddTask(id)}
            className="p-1 rounded-md text-foreground-muted hover:text-primary hover:bg-surface transition-colors"
            title="Tambah Tugas"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-border rounded-lg text-xs text-foreground-muted">
            Belum ada tugas di kolom ini
          </div>
        )}
      </div>
    </div>
  )
}
