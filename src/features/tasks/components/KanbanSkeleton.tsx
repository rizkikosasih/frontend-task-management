export function KanbanSkeleton() {
  const columns = ['Perlu Dikerjakan', 'Sedang Berjalan', 'Selesai']

  return (
    <div
      aria-hidden="true"
      className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      {columns.map((title) => (
        <div
          key={title}
          className="flex flex-col rounded-xl border border-border p-4 min-h-[500px] w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center md:snap-align-none bg-surface-subtle/40 animate-pulse space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="h-5 w-32 bg-surface-subtle rounded-md" />
            <div className="h-5 w-8 bg-surface-subtle rounded-full" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="bg-surface rounded-lg border border-border p-4 shadow-2xs space-y-3"
              >
                <div className="h-4 w-3/4 bg-surface-subtle rounded-md" />
                <div className="h-3 w-full bg-surface-subtle rounded-md" />
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
                  <div className="h-3 w-16 bg-surface-subtle rounded-md" />
                  <div className="h-4 w-12 bg-surface-subtle rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
