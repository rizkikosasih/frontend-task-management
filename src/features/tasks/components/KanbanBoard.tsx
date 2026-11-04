import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Task, TaskStatus } from '@/types/task'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'

export interface KanbanBoardProps {
  tasks: Task[]
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void
  onTaskClick?: (task: Task) => void
  onAddTask?: (status: TaskStatus) => void
  canAddTask?: boolean
}

export function KanbanBoard({
  tasks,
  onStatusChange,
  onTaskClick,
  onAddTask,
  canAddTask = false,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Perlu Dikerjakan' },
    { id: 'in_progress', title: 'Sedang Berjalan' },
    { id: 'done', title: 'Selesai' },
  ]

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === Number(event.active.id))
    if (task) {
      setActiveTask(task)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = Number(active.id)
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    if (task.status === 'done') return

    let targetStatus: TaskStatus | null = null

    if (over.id === 'todo' || over.id === 'in_progress' || over.id === 'done') {
      targetStatus = over.id as TaskStatus
    } else {
      const overTask = tasks.find((t) => t.id === Number(over.id))
      if (overTask) {
        targetStatus = overTask.status
      }
    }

    if (targetStatus && targetStatus !== task.status) {
      onStatusChange(taskId, targetStatus)
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)
          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={columnTasks}
              onTaskClick={onTaskClick}
              onAddTask={onAddTask}
              canAddTask={canAddTask}
            />
          )
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="transform rotate-2 scale-105 shadow-xl">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
