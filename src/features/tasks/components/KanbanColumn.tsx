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
    todo: 'border-slate-300 bg-slate-100/70',
    in_progress: 'border-amber-300 bg-amber-50/50',
    done: 'border-emerald-300 bg-emerald-50/50',
  }

  const badgeColors = {
    todo: 'bg-slate-200 text-slate-700',
    in_progress: 'bg-amber-200 text-amber-800',
    done: 'bg-emerald-200 text-emerald-800',
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border p-4 min-h-[500px] transition-colors ${
        columnColors[id]
      } ${isOver ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 text-sm tracking-wide">{title}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeColors[id]}`}
          >
            {tasks.length}
          </span>
        </div>
        {canAddTask && onAddTask && (
          <button
            type="button"
            onClick={() => onAddTask(id)}
            className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-white/80 transition-colors"
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
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
            Belum ada tugas di kolom ini
          </div>
        )}
      </div>
    </div>
  )
}
