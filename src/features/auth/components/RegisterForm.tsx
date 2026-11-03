import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toast } from '@/components/feedback/Toast'
import { useAuthMutations } from '../hooks/useAuthMutations'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Konfirmasi kata sandi tidak cocok',
    path: ['password_confirmation'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const { registerMutation } = useAuthMutations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  function onSubmit(values: RegisterFormValues) {
    registerMutation.mutate(values)
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-2">
          <UserPlus className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Registrasi Anggota</h2>
        <p className="text-sm text-slate-500">
          Buat akun baru untuk mulai menerima penugasan pekerjaan tim
        </p>
      </div>

      {registerMutation.isError && (
        <Toast
          type="error"
          message={registerMutation.error instanceof Error ? registerMutation.error.message : 'Registrasi gagal diproses.'}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="Budi Santoso"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Alamat Email"
          type="email"
          placeholder="budi@example.com"
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

        <Input
          label="Konfirmasi Kata Sandi"
          type="password"
          placeholder="••••••••"
          error={errors.password_confirmation?.message}
          {...register('password_confirmation')}
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={registerMutation.isPending}
        >
          Daftar Akun
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Sudah memiliki akun?{' '}
        <Link to="/login" className="text-indigo-600 font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  )
}
