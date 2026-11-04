import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStatusMutation } from './useTaskStatusMutation'
import type { ApiResponse } from '@/types/api'
import type { Task } from '@/types/task'
import type { ReactNode } from 'react'

describe('useTaskStatusMutation', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
  })

  function createWrapper() {
    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  it('updates task status optimistically on mutate', async () => {
    const initialTasks: Task[] = [
      {
        id: 101,
        project_id: 1,
        title: 'Task A',
        status: 'todo',
      },
    ]

    const queryKey = ['tasks', { project_id: 1 }]
    queryClient.setQueryData<ApiResponse<Task[]>>(queryKey, {
      success: true,
      message: 'OK',
      data: initialTasks,
    })

    const { result } = renderHook(() => useTaskStatusMutation(1), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ id: 101, status: 'in_progress' })

    await waitFor(() => {
      const cached = queryClient.getQueryData<ApiResponse<Task[]>>(queryKey)
      expect(cached?.data[0].status).toBe('in_progress')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('rolls back to previous status when mutation fails with 409 error', async () => {
    const initialTasks: Task[] = [
      {
        id: 999,
        project_id: 1,
        title: 'Conflict Task',
        status: 'todo',
      },
    ]

    const queryKey = ['tasks', { project_id: 1 }]
    queryClient.setQueryData<ApiResponse<Task[]>>(queryKey, {
      success: true,
      message: 'OK',
      data: initialTasks,
    })

    const { result } = renderHook(() => useTaskStatusMutation(1), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ id: 999, status: 'done' })

    await waitFor(() => expect(result.current.isError).toBe(true))

    const rolledBackData = queryClient.getQueryData<ApiResponse<Task[]>>(queryKey)
    expect(rolledBackData?.data[0].status).toBe('todo')
  })
})
