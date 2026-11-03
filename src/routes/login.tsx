import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { token } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate({ to: '/projects' })
    }
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center py-12">
      <LoginForm />
    </div>
  )
}
