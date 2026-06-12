interface PageHeaderProps {
  over?: string;
  title: string;
  sub?: string;
}

export function PageHeader({ over, title, sub }: PageHeaderProps) {
  return (
    <div className="px-6 py-[clamp(40px,6vw,64px)] text-center bg-brand-surface dark:bg-dark-surface">
      <div className="max-w-[1280px] mx-auto">
        {over && (
          <div className="font-script text-[30px] text-primary leading-none">{over}</div>
        )}
        <h1 className="font-display text-[clamp(32px,5vw,52px)] text-brand-text dark:text-dark-text font-extrabold mt-1 mb-3 leading-tight">
          {title}
        </h1>
        {sub && (
          <p className="text-[17px] text-brand-muted dark:text-dark-muted max-w-[540px] mx-auto leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
