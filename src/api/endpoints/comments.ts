import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/api'
import type { Comment, CreateCommentPayload } from '@/types/comment'

export async function fetchCommentsApi(taskId: number): Promise<ApiResponse<Comment[]>> {
  const response = await apiClient.get<ApiResponse<Comment[]>>(`/tasks/${taskId}/comments`)
  return response.data
}

export async function createCommentApi(taskId: number, payload: CreateCommentPayload): Promise<ApiResponse<Comment>> {
  const response = await apiClient.post<ApiResponse<Comment>>(`/tasks/${taskId}/comments`, payload)
  return response.data
}

export async function deleteCommentApi(id: number): Promise<ApiResponse<null>> {
  const response = await apiClient.delete<ApiResponse<null>>(`/comments/${id}`)
  return response.data
}
