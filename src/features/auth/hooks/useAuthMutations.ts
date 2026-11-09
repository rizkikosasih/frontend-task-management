import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  getMeApi,
  linkOAuthProviderApi,
  loginApi,
  logoutApi,
  registerApi,
  type LinkOAuthPayload,
} from '@/api/endpoints/auth'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
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

  const linkOAuthMutation = useMutation({
    mutationFn: ({
      provider,
      payload,
    }: {
      provider: 'google' | 'github'
      payload?: LinkOAuthPayload
    }) => linkOAuthProviderApi(provider, payload),
    onSuccess: (res, vars) => {
      if (res.data?.user) {
        setUser(res.data.user)
      }
      useToastStore.getState().showToast({
        type: 'success',
        message: `Akun ${vars.provider === 'google' ? 'Google' : 'GitHub'} berhasil ditautkan.`,
      })
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    linkOAuthMutation,
  }
}
