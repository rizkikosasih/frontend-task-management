import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

export function getOAuthErrorMessage(search?: string): string | null {
  const query =
    search !== undefined ? search : typeof window !== 'undefined' ? window.location.search : ''
  const err = new URLSearchParams(query).get('error')
  if (err === 'oauth_email_missing') {
    return 'Akun OAuth Anda tidak membagikan email publik. Silakan registrasi manual.'
  }
  if (err === 'oauth_failed') {
    return 'Autentikasi OAuth gagal diproses. Silakan coba kembali.'
  }
  return null
}

function LoginPage() {
  const { token } = useAuthStore()
  const navigate = useNavigate()
  const errorMessage = getOAuthErrorMessage()

  useEffect(() => {
    if (token) {
      navigate({ to: '/projects' })
    }
  }, [token, navigate])

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {errorMessage && (
        <div className="w-full max-w-md p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium">
          {errorMessage}
        </div>
      )}
      <LoginForm />
    </div>
  )
}
