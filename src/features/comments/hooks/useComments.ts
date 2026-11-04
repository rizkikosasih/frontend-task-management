import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCommentApi, deleteCommentApi, fetchCommentsApi } from '@/api/endpoints/comments'
import type { CreateCommentPayload } from '@/types/comment'

export function useComments(taskId: number) {
  const queryClient = useQueryClient()

  const commentsQuery = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => fetchCommentsApi(taskId),
    enabled: !!taskId,
  })

  const createCommentMutation = useMutation({
    mutationFn: (payload: CreateCommentPayload) => createCommentApi(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteCommentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
    },
  })

  return {
    commentsQuery,
    createCommentMutation,
    deleteCommentMutation,
  }
}
