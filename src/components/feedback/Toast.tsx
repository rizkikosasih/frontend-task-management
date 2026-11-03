import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { clsx } from 'clsx'

export interface ToastProps {
  type?: 'success' | 'error'
  message: string
  onClose?: () => void
}

export function Toast({ type = 'success', message, onClose }: ToastProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-4 rounded-lg border text-sm shadow-sm transition-all',
        type === 'success'
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : 'bg-rose-50 text-rose-800 border-rose-200'
      )}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
      )}
      <span className="flex-1 font-medium">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
