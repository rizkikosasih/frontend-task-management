export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message: string
  data: T
  meta?: ApiMeta
}

export interface ApiMeta {
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
}

export interface ApiErrorResponse {
  status: 'error'
  message: string
  errors?: Record<string, string[]>
}
