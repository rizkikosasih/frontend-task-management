import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@/types/task'

const taskSchema = z.object({
  title: z.string().min(3, 'Judul tugas minimal 3 karakter'),
  description: z.string().optional(),
  due_date: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskSchema>

export interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task | null
  projectId: number
  onSubmit: (values: CreateTaskPayload | UpdateTaskPayload) => void
  isLoading?: boolean
}

export function TaskModal({
  isOpen,
  onClose,
  task,
  projectId,
  onSubmit,
  isLoading = false,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
    },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        due_date: task.due_date || '',
      })
    } else {
      reset({
        title: '',
        description: '',
        due_date: '',
      })
    }
  }, [task, reset, isOpen])

  function handleFormSubmit(values: TaskFormValues) {
    if (task) {
      onSubmit({
        title: values.title,
        description: values.description,
        due_date: values.due_date || undefined,
      })
    } else {
      onSubmit({
        project_id: projectId,
        title: values.title,
        description: values.description,
        due_date: values.due_date || undefined,
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Rincian Tugas' : 'Tambah Tugas Baru'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Judul Tugas"
          placeholder="Konfigurasi SSL Endpoint"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Deskripsi Pekerjaan (Opsional)
          </label>
          <textarea
            rows={3}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-400"
            placeholder="Instruksi detail penugasan..."
            {...register('description')}
          />
        </div>

        <Input
          label="Tenggat Waktu (Opsional)"
          type="date"
          error={errors.due_date?.message}
          {...register('due_date')}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {task ? 'Simpan Perubahan' : 'Buat Tugas'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
