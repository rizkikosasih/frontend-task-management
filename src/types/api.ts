export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  meta?: ApiMeta | null
}

export interface ApiMeta {
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
  has_next_page?: boolean
}

export interface ApiErrorResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]> | null
}
