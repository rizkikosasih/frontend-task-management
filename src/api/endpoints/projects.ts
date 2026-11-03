import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/api'
import type { CreateProjectPayload, Project, UpdateProjectPayload } from '@/types/project'

export interface FetchProjectsParams {
  page?: number
  per_page?: number
  search?: string
}

export async function fetchProjectsApi(params?: FetchProjectsParams): Promise<ApiResponse<Project[]>> {
  const response = await apiClient.get<ApiResponse<Project[]>>('/projects', { params })
  return response.data
}

export async function fetchProjectDetailApi(id: number): Promise<ApiResponse<Project>> {
  const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`)
  return response.data
}

export async function createProjectApi(payload: CreateProjectPayload): Promise<ApiResponse<Project>> {
  const response = await apiClient.post<ApiResponse<Project>>('/projects', payload)
  return response.data
}

export async function updateProjectApi(id: number, payload: UpdateProjectPayload): Promise<ApiResponse<Project>> {
  const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, payload)
  return response.data
}

export async function deleteProjectApi(id: number): Promise<ApiResponse<null>> {
  const response = await apiClient.delete<ApiResponse<null>>(`/projects/${id}`)
  return response.data
}
