import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskStatusApi } from '@/api/endpoints/tasks'
import type { Task, TaskStatus } from '@/types/task'
import type { ApiResponse } from '@/types/api'

export function useTaskStatusMutation(projectId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      updateTaskStatusApi(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const queryKey = ['tasks', projectId ? { project_id: projectId } : undefined]
      const previousData = queryClient.getQueryData<ApiResponse<Task[]>>(queryKey)

      if (previousData?.data) {
        queryClient.setQueryData<ApiResponse<Task[]>>(queryKey, {
          ...previousData,
          data: previousData.data.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })
      }

      return { previousData, queryKey }
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData && context.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ['projects', projectId] })
      }
    },
  })
}
