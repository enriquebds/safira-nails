export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative min-h-[min(640px,90vh)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-pale to-brand-offwhite dark:from-dark-surface dark:to-dark-bg animate-pulse">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="h-8 w-48 rounded-full bg-primary/20" />
          <div className="h-14 w-[min(520px,80vw)] rounded-2xl bg-primary/15" />
          <div className="h-14 w-[min(380px,70vw)] rounded-2xl bg-primary/10" />
          <div className="h-5 w-[min(400px,75vw)] rounded-lg bg-brand-muted/15 mt-2" />
          <div className="flex gap-3 mt-4">
            <div className="h-12 w-40 rounded-full bg-primary/25" />
            <div className="h-12 w-40 rounded-full bg-primary/10" />
          </div>
        </div>
      </section>

      {/* Services skeleton */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 animate-pulse">
        <div className="text-center mb-10 flex flex-col items-center gap-3">
          <div className="h-8 w-24 rounded-full bg-primary/20" />
          <div className="h-10 w-48 rounded-xl bg-primary/15" />
          <div className="h-5 w-72 rounded-lg bg-brand-muted/15" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[20px] p-6 border border-primary/10 bg-white dark:bg-dark-elevated flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-primary/10" />
              <div className="h-5 w-3/4 rounded-lg bg-brand-muted/15" />
              <div className="h-4 w-full rounded bg-brand-muted/10" />
              <div className="h-4 w-2/3 rounded bg-brand-muted/10" />
              <div className="h-5 w-1/2 rounded-lg bg-primary/15 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured products skeleton */}
      <section className="bg-primary-pale dark:bg-dark-surface py-16 animate-pulse">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10 flex flex-col items-center gap-3">
            <div className="h-8 w-28 rounded-full bg-primary/20" />
            <div className="h-10 w-56 rounded-xl bg-primary/15" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-[20px] overflow-hidden border border-primary/10 bg-white dark:bg-dark-elevated">
                <div className="aspect-square bg-primary/10" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-3/4 rounded-lg bg-brand-muted/15" />
                  <div className="h-5 w-1/3 rounded-lg bg-primary/15" />
                  <div className="h-9 w-full rounded-full bg-primary/10 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery skeleton */}
      <section className="max-w-[1280px] mx-auto px-6 py-16 animate-pulse">
        <div className="text-center mb-10 flex flex-col items-center gap-3">
          <div className="h-8 w-20 rounded-full bg-primary/20" />
          <div className="h-10 w-44 rounded-xl bg-primary/15" />
        </div>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[16px] bg-primary/8 dark:bg-dark-elevated break-inside-avoid"
              style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 2 === 0 ? '1/1' : '4/5' }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
