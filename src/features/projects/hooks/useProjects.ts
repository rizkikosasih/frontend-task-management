import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProjectApi,
  deleteProjectApi,
  fetchProjectDetailApi,
  fetchProjectsApi,
  FetchProjectsParams,
  updateProjectApi,
} from '@/api/endpoints/projects'
import type { CreateProjectPayload, UpdateProjectPayload } from '@/types/project'

export function useProjects(params?: FetchProjectsParams) {
  const queryClient = useQueryClient()

  const projectsQuery = useQuery({
    queryKey: ['projects', params],
    queryFn: () => fetchProjectsApi(params),
  })

  const createMutation = useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProjectApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateProjectPayload }) =>
      updateProjectApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProjectApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return {
    projectsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

export function useProjectDetail(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProjectDetailApi(id),
    enabled: !!id,
  })
}

