export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-surface rounded-xl border border-border p-6 shadow-xs flex flex-col justify-between space-y-4 animate-pulse"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border shrink-0" />
        </div>
        <div className="h-6 w-3/4 bg-surface-subtle rounded-md" />
        <div className="space-y-1.5 min-h-[40px]">
          <div className="h-4 w-full bg-surface-subtle rounded-md" />
          <div className="h-4 w-2/3 bg-surface-subtle rounded-md" />
        </div>
      </div>
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
        <div className="h-4 w-20 bg-surface-subtle rounded-md" />
        <div className="h-4 w-24 bg-surface-subtle rounded-md" />
      </div>
    </div>
  )
}

