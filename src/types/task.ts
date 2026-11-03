export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: number
  project_id: number
  title: string
  description?: string | null
  status: TaskStatus
  assigned_to?: number | null
  created_at: string
}
