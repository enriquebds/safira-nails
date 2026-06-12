export default function LojaLoading() {
  return (
    <>
      {/* PageHeader skeleton */}
      <div className="px-6 py-[clamp(40px,6vw,64px)] text-center bg-brand-surface dark:bg-dark-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-3 animate-pulse">
          <div className="h-7 w-20 rounded-full bg-primary/20" />
          <div className="h-10 w-40 rounded-xl bg-primary/15" />
          <div className="h-5 w-72 rounded-lg bg-brand-muted/15" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-4 flex gap-2 animate-pulse overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-primary/10 shrink-0" />
        ))}
      </div>

      {/* Product grid skeleton */}
      <div className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[20px] overflow-hidden border border-primary/10 dark:border-dark-text/10 bg-white dark:bg-dark-elevated">
              <div className="aspect-square bg-primary/10" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-4 w-3/4 rounded-lg bg-brand-muted/15" />
                <div className="h-4 w-1/2 rounded-lg bg-brand-muted/10" />
                <div className="h-6 w-1/3 rounded-lg bg-primary/15 mt-1" />
                <div className="h-9 w-full rounded-full bg-primary/10 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
