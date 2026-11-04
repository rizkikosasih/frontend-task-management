import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TaskStatus } from '@/types/task'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TaskStatus | 'admin' | 'member' | 'default'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    todo: 'bg-surface-subtle text-foreground-muted border-border',
    in_progress: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    done: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    admin: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    member: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    default: 'bg-surface-subtle text-foreground-muted border-border',
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

