import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const commentSchema = z.object({
  message: z.string().min(1, 'Komentar tidak boleh kosong'),
})

type CommentFormValues = z.infer<typeof commentSchema>

export interface CommentFormProps {
  onSubmit: (message: string) => void
  isLoading?: boolean
}

export function CommentForm({ onSubmit, isLoading = false }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: '',
    },
  })

  function handleFormSubmit(values: CommentFormValues) {
    onSubmit(values.message)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
      <div className="relative">
        <textarea
          rows={2}
          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-400"
          placeholder="Tuliskan komentar atau pembaruan tugas..."
          {...register('message')}
        />
        {errors.message && (
          <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="sm" isLoading={isLoading}>
          <Send className="w-3.5 h-3.5" />
          <span>Kirim</span>
        </Button>
      </div>
    </form>
  )
}
