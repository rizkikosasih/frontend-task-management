import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTaskApi,
  deleteTaskApi,
  fetchTaskDetailApi,
  fetchTasksApi,
  FetchTasksParams,
  updateTaskApi,
} from '@/api/endpoints/tasks'
import type { CreateTaskPayload, UpdateTaskPayload } from '@/types/task'

export function useTasks(params?: FetchTasksParams) {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: ['tasks', params],
    queryFn: () => fetchTasksApi(params),
  })

  const createTaskMutation = useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTaskApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTaskPayload }) =>
      updateTaskApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => deleteTaskApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}

export function useTaskDetail(id: number) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fetchTaskDetailApi(id),
    enabled: !!id,
  })
}
