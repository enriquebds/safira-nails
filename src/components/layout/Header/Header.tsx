'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useCartStore } from '@/store/cartStore';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#galeria', label: 'Galeria' },
  { href: '/loja', label: 'Loja' },
  { href: '/agendamento', label: 'Agendamento' },
  { href: '/contato', label: 'Contato' },
];

function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-10 h-10">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor={light ? '#fff' : '#7B2D9E'} />
            <stop offset="50%"  stopColor={light ? 'rgba(255,255,255,0.85)' : '#9B3FC8'} />
            <stop offset="100%" stopColor={light ? 'rgba(255,255,255,0.7)' : '#D94F80'} />
          </linearGradient>
        </defs>
        <text x="50" y="78" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="88" fontWeight="bold" fill="url(#logo-g)">S</text>
      </svg>
      <div className="leading-none">
        <span className={`font-display font-bold text-[21px] ${light ? 'text-white' : 'text-brand-text dark:text-dark-text'}`}>
          Safira
        </span>
        <span className={`font-script text-[23px] ml-1 ${light ? 'text-white' : 'text-primary'}`}>
          Nails
        </span>
      </div>
    </Link>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Header() {
  const scrolled = useScrollHeader();
  const totalItems = useCartStore(s => s.totalItems());
  const openCart = useCartStore(s => s.openCart);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, closeMobile?: boolean) {
    if (closeMobile) setMenuOpen(false);
    if (!href.startsWith('/#')) return;
    const id = href.slice(2);
    if (pathname === '/') {
      e.preventDefault();
      scrollToId(id);
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-[14px] transition-[border-color] duration-300 ${
          scrolled
            ? 'border-b border-primary/10 dark:border-dark-text/10'
            : 'border-b border-transparent'
        }`}
        style={{ background: 'var(--header-bg)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden min-[860px]:flex items-center gap-7">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={e => handleNavClick(e, n.href)}
                className="text-[15px] text-brand-muted dark:text-dark-muted font-medium hover:text-primary dark:hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-6 after:h-0.5 after:w-0 after:bg-current after:transition-[width] hover:after:w-full"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Cart button */}
            <button
              onClick={openCart}
              title="Carrinho"
              className="cursor-pointer relative w-10 h-10 rounded-full border border-primary/20 dark:border-dark-text/20 bg-transparent text-brand-text dark:text-dark-text flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
                <path d="M2 3h3l2.2 12.3a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center animate-[safPop_.25s_ease]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="min-[860px]:hidden w-10 h-10 rounded-full border border-primary/20 dark:border-dark-text/20 bg-transparent text-brand-text dark:text-dark-text flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-60 bg-[rgba(20,2,30,0.5)] backdrop-blur-[6px]"
          >
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="absolute top-0 right-0 bottom-0 w-[min(80vw,320px)] bg-brand-offwhite dark:bg-dark-bg p-6 flex flex-col gap-1.5"
            >
              <div className="flex justify-between items-center mb-4">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-transparent border-none text-brand-muted dark:text-dark-muted cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              {NAV.map(n => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={e => handleNavClick(e, n.href, true)}
                  className="font-display text-[22px] text-brand-text dark:text-dark-text py-3 border-b border-primary/10 dark:border-dark-text/10"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-auto">
                <a
                  href={buildGenericBookingMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3.5 px-6 font-semibold text-[15px] mt-4"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
                  Agendar pelo WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
