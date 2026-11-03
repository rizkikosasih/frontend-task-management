export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'member'
  created_at: string
}

export interface AuthResponse {
  user: User
  token: string
}
