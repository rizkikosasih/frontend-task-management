export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface TaskUser {
  id: number
  name: string
}

export interface TaskProject {
  id: number
  name: string
}

export interface Task {
  id: number
  project_id: number
  title: string
  description?: string | null
  status: TaskStatus
  assigned_to?: TaskUser | number | null
  due_date?: string | null
  created_at?: string
  updated_at?: string
  project?: TaskProject
}

export interface CreateTaskPayload {
  project_id: number
  title: string
  description?: string
  assigned_to?: number
  due_date?: string
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  assigned_to?: number
  due_date?: string
}

export interface UpdateTaskStatusPayload {
  status: TaskStatus
}
