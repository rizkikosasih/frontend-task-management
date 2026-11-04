import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { token } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate({ to: '/projects' })
    }
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center py-12">
      <RegisterForm />
    </div>
  )
}
