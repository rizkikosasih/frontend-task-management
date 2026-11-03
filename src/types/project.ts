export interface ProjectUser {
  id: number
  name: string
}

export interface Project {
  id: number
  name: string
  description?: string | null
  created_by?: ProjectUser | number
  created_at?: string
  updated_at?: string
  tasks_count?: number
}

export interface CreateProjectPayload {
  name: string
  description?: string
}

export interface UpdateProjectPayload {
  name?: string
  description?: string
}
