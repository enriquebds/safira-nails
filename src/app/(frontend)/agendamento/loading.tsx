export default function AgendamentoLoading() {
  return (
    <>
      {/* PageHeader skeleton */}
      <div
        className="px-6 py-[clamp(40px,6vw,64px)] text-center"
        style={{ background: 'linear-gradient(160deg, var(--color-primary-pale), var(--color-brand-offwhite))' }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-3 animate-pulse">
          <div className="h-7 w-28 rounded-full bg-primary/20" />
          <div className="h-10 w-44 rounded-xl bg-primary/15" />
          <div className="h-5 w-80 rounded-lg bg-brand-muted/15" />
        </div>
      </div>

      {/* Booking form skeleton */}
      <section className="max-w-[680px] mx-auto px-6 py-12 animate-pulse">
        <div className="flex flex-col gap-5">
          {/* Service selector */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-brand-muted/15" />
            <div className="h-11 w-full rounded-xl bg-primary/8 border border-primary/10" />
          </div>

          {/* Name + phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-20 rounded bg-brand-muted/15" />
                <div className="h-11 w-full rounded-xl bg-primary/8 border border-primary/10" />
              </div>
            ))}
          </div>

          {/* Date + time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-16 rounded bg-brand-muted/15" />
                <div className="h-11 w-full rounded-xl bg-primary/8 border border-primary/10" />
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-brand-muted/15" />
            <div className="h-24 w-full rounded-xl bg-primary/8 border border-primary/10" />
          </div>

          {/* Submit button */}
          <div className="h-12 w-full rounded-full bg-primary/20 mt-2" />
        </div>
      </section>
    </>
  );
}
