import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { getMeApi } from '@/api/endpoints/auth'

export const Route = createFileRoute('/oauth/callback')({
  component: OAuthCallbackPage,
})

function OAuthCallbackPage() {
  const navigate = useNavigate()
  const { setAuth, setUser } = useAuthStore()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    async function completeOAuth(authToken: string) {
      try {
        localStorage.setItem('auth_token', authToken)
        const profile = await getMeApi()
        setAuth(
          {
            ...profile.data.user,
            roles: profile.data.roles,
          },
          authToken
        )
      } catch {
        setUser({
          id: 0,
          name: 'Pengguna OAuth',
          email: '',
          roles: ['member'],
        })
      } finally {
        navigate({ to: '/projects' })
      }
    }

    if (token) {
      completeOAuth(token)
    } else {
      navigate({ to: '/login' })
    }
  }, [navigate, setAuth, setUser])

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <p className="text-sm font-medium text-slate-600">Menyelesaikan otentikasi OAuth...</p>
    </div>
  )
}
