import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/project'

const projectSchema = z.object({
  name: z.string().min(3, 'Nama proyek minimal 3 karakter'),
  description: z.string().optional(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: Project | null
  onSubmit: (values: ProjectFormValues) => void
  isLoading?: boolean
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit,
  isLoading = false,
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description || '',
      })
    } else {
      reset({
        name: '',
        description: '',
      })
    }
  }, [project, reset, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Edit Informasi Proyek' : 'Buat Proyek Baru'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nama Proyek"
          placeholder="Platform Integrasi Gateway"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Deskripsi Proyek (Opsional)
          </label>
          <textarea
            rows={3}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder:text-slate-400"
            placeholder="Keterangan singkat cakupan proyek..."
            {...register('description')}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {project ? 'Simpan Perubahan' : 'Buat Proyek'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
