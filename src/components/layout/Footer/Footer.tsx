'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#galeria', label: 'Galeria' },
  { href: '/loja', label: 'Loja' },
  { href: '/agendamento', label: 'Agendamento' },
  { href: '/contato', label: 'Contato' },
];

export function Footer() {
  const pathname = usePathname();
  const { whatsappNumber, whatsappPretty, instagramHandle, address, paymentMethods } = useSiteSettings();

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('/#')) return;
    const id = href.slice(2);
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer className="bg-gradient-to-br from-primary-dark to-primary text-white px-6 pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
        {/* Brand */}
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[11px] bg-white/20 flex items-center justify-center text-white font-display font-bold text-[23px]">S</div>
            <div className="leading-none">
              <span className="font-display font-bold text-[21px] text-white">Safira</span>
              <span className="font-script text-[23px] ml-1 text-white">Nails</span>
            </div>
          </Link>
          <p className="font-script text-[28px] opacity-95 my-4">Valiosa como uma safira</p>
          <div className="flex gap-3">
            <a href={buildGenericBookingMessage(whatsappNumber)} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z M9 9.5c0 4 3 6.5 5.5 6.5.8 0 1.5-.7 1.5-1.3 0-.4-1.8-1.4-2.2-1.2-.5.3-.8 1-1.3.7-1.2-.6-2.1-1.6-2.4-2.7-.1-.5.5-.8.8-1.3.2-.4-.8-2.2-1.2-2.2-.6 0-1.3.7-1.3 1.5z" /></svg>
            </a>
            <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.4" fill="#fff" /></svg>
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <h4 className="font-display text-[18px] mb-4">Navegação</h4>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={e => handleNavClick(e, n.href)} className="block text-[14px] opacity-85 mb-2.5 hover:opacity-100 transition-opacity">
              {n.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-[18px] mb-4">Contato</h4>
          <div className="flex items-center gap-2 text-[14px] opacity-85 mb-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
            {address}
          </div>
          <div className="flex items-center gap-2 text-[14px] opacity-85 mb-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
            {whatsappPretty}
          </div>
          <div className="flex items-center gap-2 text-[14px] opacity-85">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.4" fill="#fff" /></svg>
            @{instagramHandle}
          </div>
        </div>

        {/* Payment */}
        <div>
          <h4 className="font-display text-[18px] mb-4">Pagamento</h4>
          <div className="flex gap-2 flex-wrap">
            {paymentMethods.map((p: string) => (
              <span key={p} className="text-[12px] px-[11px] py-[5px] rounded-[7px] bg-white/20">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-8 pt-5 border-t border-white/20 text-[13px] opacity-75 text-center">
        © 2025 Safira Nails. Todos os direitos reservados.
      </div>
    </footer>
  );
}
