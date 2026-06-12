import { PageHeader } from '@/components/features/PageHeader/PageHeader';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

function ContactIcon({ name }: { name: string }) {
  const props = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'text-primary' };
  if (name === 'pin') return <svg {...props}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === 'whatsapp') return <svg {...props}><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z M9 9.5c0 4 3 6.5 5.5 6.5.8 0 1.5-.7 1.5-1.3 0-.4-1.8-1.4-2.2-1.2-.5.3-.8 1-1.3.7-1.2-.6-2.1-1.6-2.4-2.7-.1-.5.5-.8.8-1.3.2-.4-.8-2.2-1.2-2.2-.6 0-1.3.7-1.3 1.5z" /></svg>;
  return <svg {...props}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.4" fill="currentColor" /></svg>;
}

export default async function ContatoPage() {
  const { whatsappNumber, whatsappPretty, instagramHandle, address } = await getSiteSettings();

  const cards = [
    {
      icon: 'pin',
      title: 'Endereço',
      value: address,
      sub: 'Ver no Google Maps',
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      value: whatsappPretty,
      sub: 'Toque para conversar',
      href: buildGenericBookingMessage(whatsappNumber),
    },
    {
      icon: 'instagram',
      title: 'Instagram',
      value: `@${instagramHandle}`,
      sub: 'Veja nossos trabalhos',
      href: `https://instagram.com/${instagramHandle}`,
    },
  ];

  return (
    <>
      <PageHeader
        over="fale com a gente"
        title="Contato"
        sub={`Estamos pertinho de você em ${address}. Venha tomar um café e renovar suas unhas.`}
      />

      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {cards.map(card => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline bg-white dark:bg-dark-elevated rounded-[16px] p-7 border border-primary/10 dark:border-dark-text/10 shadow-card flex flex-col gap-1.5 transition-transform hover:-translate-y-1"
            >
              <span className="text-primary mb-2">
                <ContactIcon name={card.icon} />
              </span>
              <span className="text-[13px] uppercase tracking-[1px] text-brand-muted dark:text-dark-muted">{card.title}</span>
              <span className="font-display text-[22px] text-brand-text dark:text-dark-text font-extrabold">{card.value}</span>
              <span className="text-[14px] text-primary">{card.sub}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="rounded-[24px] overflow-hidden border border-primary/10 dark:border-dark-text/10 shadow-card h-[420px]">
          <iframe
            title="Mapa Safira Nails"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=14&output=embed`}
            style={{ border: 0, width: '100%', height: '100%', filter: 'saturate(1.05)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
