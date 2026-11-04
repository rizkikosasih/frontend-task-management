export interface CommentUser {
  id: number
  name: string
}

export interface Comment {
  id: number
  task_id: number
  user_id: number
  message: string
  created_at?: string
  user?: CommentUser
}

export interface CreateCommentPayload {
  message: string
}
