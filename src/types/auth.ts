export interface User {
  id: number
  name: string
  email: string
  roles?: string[]
}

export interface AuthData {
  user: User
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}
