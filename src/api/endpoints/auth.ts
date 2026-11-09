import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/api'
import type { AuthData, LoginPayload, RegisterPayload, User } from '@/types/auth'

export async function loginApi(payload: LoginPayload): Promise<ApiResponse<AuthData>> {
  const response = await apiClient.post<ApiResponse<AuthData>>('/auth/login', payload)
  return response.data
}

export async function registerApi(payload: RegisterPayload): Promise<ApiResponse<AuthData>> {
  const response = await apiClient.post<ApiResponse<AuthData>>('/auth/register', payload)
  return response.data
}

export async function logoutApi(): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>('/auth/logout')
  return response.data
}

export interface ProfileData {
  user: User
  roles: string[]
  permissions: unknown[]
}

export async function getMeApi(): Promise<ApiResponse<ProfileData>> {
  const response = await apiClient.get<ApiResponse<ProfileData>>('/auth/me')
  return response.data
}

export interface OAuthRedirectData {
  redirect_url: string
  url?: string
}

export async function getOAuthRedirectUrl(
  provider: 'google' | 'github'
): Promise<ApiResponse<OAuthRedirectData>> {
  const response = await apiClient.get<ApiResponse<OAuthRedirectData>>(
    `/oauth/${provider}/redirect`
  )
  return response.data
}
