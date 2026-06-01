import Link from 'next/link';

type Variant = 'primary' | 'outline' | 'whatsapp' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  href?: string;
  full?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary hover:brightness-105 text-white border-transparent',
  outline: 'bg-transparent text-primary border-primary hover:brightness-105',
  whatsapp: 'bg-[#25D366] hover:brightness-105 text-white border-transparent',
  ghost: 'bg-transparent text-brand-muted dark:text-dark-muted border-brand-muted/30 hover:brightness-105',
};

const sizeClasses: Record<Size, string> = {
  sm: 'py-2 px-[18px] text-[14px]',
  md: 'py-[13px] px-[26px] text-[15px]',
  lg: 'py-[15px] px-[30px] text-[16px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  full,
  disabled,
  type = 'button',
  className = '',
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold border-[1.5px] transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant]} ${full ? 'w-full flex' : ''} ${disabled ? 'opacity-45 cursor-not-allowed' : 'hover:-translate-y-0.5'} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  if (!href && typeof href === 'undefined' && onClick === undefined && type === 'button') {
    return (
      <button type={type} onClick={disabled ? undefined : onClick} disabled={disabled} className={base}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} onClick={disabled ? undefined : onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
