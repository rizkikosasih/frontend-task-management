import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { getMeApi, loginApi, logoutApi, registerApi } from '@/api/endpoints/auth'
import { useAuthStore } from '@/stores/authStore'
import type { LoginPayload, RegisterPayload } from '@/types/auth'

export function useAuthMutations() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setAuth, setUser, clearAuth } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: async (res) => {
      setAuth(res.data.user, res.data.token)
      try {
        const profile = await getMeApi()
        setUser({
          ...profile.data.user,
          roles: profile.data.roles,
        })
      } catch {
        setUser(res.data.user)
      }
      queryClient.clear()
      navigate({ to: '/projects' })
    },
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.token)
      queryClient.clear()
      navigate({ to: '/projects' })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      clearAuth()
      queryClient.clear()
      navigate({ to: '/login' })
    },
  })

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
  }
}

