import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toast } from '@/components/feedback/Toast'
import { useAuthMutations } from '../hooks/useAuthMutations'
import { getOAuthRedirectUrl } from '@/api/endpoints/auth'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const { loginMutation } = useAuthMutations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values)
  }

  async function handleOAuth(provider: 'google' | 'github') {
    try {
      const res = await getOAuthRedirectUrl(provider)
      if (res.data?.url) {
        window.location.href = res.data.url
      }
    } catch {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/oauth/${provider}/redirect`
    }
  }

  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-subtle text-primary-accent border border-border mb-2">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Masuk ke Akun</h2>
        <p className="text-sm text-foreground-muted">
          Kelola proyek dan tugas tim Anda dalam satu dasbor terpadu
        </p>
      </div>

      {loginMutation.isError && (
        <Toast
          type="error"
          message={loginMutation.error instanceof Error ? loginMutation.error.message : 'Kredensial login tidak cocok.'}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Alamat Email"
          type="email"
          placeholder="admin@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Kata Sandi"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={loginMutation.isPending}
        >
          Masuk
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-foreground-muted font-medium">atau masuk via OAuth</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleOAuth('google')}
          className="text-xs"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleOAuth('github')}
          className="text-xs"
        >
          GitHub
        </Button>
      </div>

      <p className="text-center text-xs text-foreground-muted">
        Belum memiliki akun?{' '}
        <Link to="/register" className="text-primary-accent font-medium hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
}

