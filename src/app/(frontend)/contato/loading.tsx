export default function ContatoLoading() {
  return (
    <>
      {/* PageHeader skeleton */}
      <div className="px-6 py-[clamp(40px,6vw,64px)] text-center bg-brand-surface dark:bg-dark-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-3 animate-pulse">
          <div className="h-7 w-32 rounded-full bg-primary/20" />
          <div className="h-10 w-36 rounded-xl bg-primary/15" />
          <div className="h-5 w-80 rounded-lg bg-brand-muted/15" />
        </div>
      </div>

      {/* Contact cards skeleton */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[20px] p-7 border border-primary/10 dark:border-dark-text/10 bg-white dark:bg-dark-elevated flex flex-col gap-2">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-primary/10 mb-2" />
              <div className="h-3 w-16 rounded bg-brand-muted/15" />
              <div className="h-6 w-40 rounded-lg bg-brand-muted/15" />
              <div className="h-4 w-28 rounded bg-primary/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Map skeleton */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="rounded-[24px] overflow-hidden border border-primary/10 dark:border-dark-text/10 h-[420px] bg-primary/5 animate-pulse" />
      </section>
    </>
  );
}
