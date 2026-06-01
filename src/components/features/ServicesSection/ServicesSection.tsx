'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

interface ServiceItem {
  name: string;
  price: string;
}

interface Service {
  id: string;
  title: string;
  icon?: string | null;
  description: string;
  items?: ServiceItem[] | null;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="servicos" className="scroll-mt-20 py-[clamp(56px,8vw,88px)] px-6 max-w-[1280px] mx-auto">
      <SectionTitle over="nossos" title="Serviços" />
      <div ref={ref} className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(155,63,200,0.18)' }}
            className="bg-white dark:bg-dark-elevated rounded-[20px] p-6 border border-primary/10 dark:border-dark-text/10 shadow-card dark:shadow-card-dark"
          >
            <div className="w-12 h-12 rounded-[13px] bg-primary-pale dark:bg-dark-surface flex items-center justify-center mb-4 text-[26px]">
              {s.icon ?? (
                <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4c1.5 11 5 14.5 16 16-11 1.5-14.5 5-16 16-1.5-11-5-14.5-16-16 11-1.5 14.5-5 16-16z" stroke="#9B3FC8" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <h3 className="font-display text-[22px] text-brand-text dark:text-dark-text font-bold mb-1.5">{s.title}</h3>
            <p className="text-[14px] text-brand-muted dark:text-dark-muted leading-[1.55] mb-4">{s.description}</p>
            {s.items && s.items.length > 0 && (
              <div className="border-t border-primary/10 dark:border-dark-text/10 pt-3.5 flex flex-col gap-2">
                {s.items.map(it => (
                  <div key={it.name} className="flex justify-between text-[14px]">
                    <span className="text-brand-muted dark:text-dark-muted">{it.name}</span>
                    <span className="text-primary font-bold">{it.price}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-9">
        <a
          href={buildGenericBookingMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:brightness-105 text-white font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
          Agende seu horário
        </a>
      </div>
    </section>
  );
}
