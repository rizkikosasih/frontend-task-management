import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              'w-full px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 transition-colors shadow-sm',
              'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500',
              className
            )
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
