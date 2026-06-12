interface SectionTitleProps {
  over?: string;
  title: string;
  align?: 'center' | 'left';
}

export function SectionTitle({ over, title, align = 'center' }: SectionTitleProps) {
  const textAlign = align === 'center' ? 'text-center' : 'text-left';
  const ruleMargin = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`${textAlign} mb-10`}>
      {over && (
        <div className="font-script text-3xl text-primary leading-none mb-1">{over}</div>
      )}
      <h2 className="font-display text-[clamp(28px,4vw,44px)] text-brand-text dark:text-dark-text font-bold mt-1 mb-2 leading-tight">
        {title}
      </h2>
      <div className={`w-8 h-px bg-primary/30 ${ruleMargin}`} />
    </div>
  );
}
