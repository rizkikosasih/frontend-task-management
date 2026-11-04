import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/api'
import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '@/types/task'

export interface FetchTasksParams {
  page?: number
  per_page?: number
  search?: string
  status?: TaskStatus
  project_id?: number
  assigned_to?: number
}

export async function fetchTasksApi(params?: FetchTasksParams): Promise<ApiResponse<Task[]>> {
  const response = await apiClient.get<ApiResponse<Task[]>>('/tasks', { params })
  return response.data
}

export async function fetchTaskDetailApi(id: number): Promise<ApiResponse<Task>> {
  const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`)
  return response.data
}

export async function createTaskApi(payload: CreateTaskPayload): Promise<ApiResponse<Task>> {
  const response = await apiClient.post<ApiResponse<Task>>('/tasks', payload)
  return response.data
}

export async function updateTaskApi(
  id: number,
  payload: UpdateTaskPayload
): Promise<ApiResponse<Task>> {
  const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, payload)
  return response.data
}

export async function updateTaskStatusApi(
  id: number,
  status: TaskStatus
): Promise<ApiResponse<Task>> {
  const response = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status })
  return response.data
}

export async function deleteTaskApi(id: number): Promise<ApiResponse<null>> {
  const response = await apiClient.delete<ApiResponse<null>>(`/tasks/${id}`)
  return response.data
}
