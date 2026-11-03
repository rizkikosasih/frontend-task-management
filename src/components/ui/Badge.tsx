import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TaskStatus } from '@/types/task'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TaskStatus | 'admin' | 'member' | 'default'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    todo: 'bg-slate-100 text-slate-700 border-slate-200',
    in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    member: 'bg-blue-50 text-blue-700 border-blue-200',
    default: 'bg-slate-50 text-slate-600 border-slate-200',
  }

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  )
}
