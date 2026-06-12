'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { buildGenericBookingMessage } from '@/utils/whatsapp';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function Hero() {
  const { heroImageUrl } = useSiteSettings();

  return (
    <section className="bg-brand-surface dark:bg-dark-surface">
      <div className="relative max-w-[1280px] mx-auto px-6 py-[clamp(52px,7vw,96px)] grid grid-cols-[1.05fr_0.95fr] max-[820px]:grid-cols-1 gap-[clamp(32px,5vw,64px)] items-center">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 dark:bg-dark-elevated text-primary font-semibold text-[13px] tracking-[0.3px] border border-primary/10"
          >
            ✦ Estúdio de Nail Design
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(36px,5.4vw,64px)] leading-[1.07] text-brand-text dark:text-dark-text font-bold mt-5 tracking-[-0.5px] text-balance"
          >
            Valiosa como uma safira,{' '}
            <span className="italic text-primary-dark">cuidada como uma joia rara</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-[clamp(15px,1.6vw,18px)] text-brand-muted dark:text-dark-muted leading-[1.65] mt-5 mb-7 max-w-[480px]"
          >
            Transformamos suas unhas em verdadeiras obras de arte. Atendimento exclusivo, com hora marcada, em Taboão da Serra.
          </motion.p>

          <motion.div variants={item} className="flex gap-3 flex-wrap">
            <a
              href={buildGenericBookingMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:brightness-105 text-white font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z M9 9.5c0 4 3 6.5 5.5 6.5.8 0 1.5-.7 1.5-1.3 0-.4-1.8-1.4-2.2-1.2-.5.3-.8 1-1.3.7-1.2-.6-2.1-1.6-2.4-2.7-.1-.5.5-.8.8-1.3.2-.4-.8-2.2-1.2-2.2-.6 0-1.3.7-1.3 1.5z" /></svg>
              Agendar pelo WhatsApp
            </a>
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-primary text-primary hover:brightness-105 font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.2 12.3a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></svg>
              Ver Produtos
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3 mt-6 text-[13px] text-brand-muted dark:text-dark-muted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="oklch(67% 0.22 354)" stroke="none"><path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z" /></svg>
            <span>5,0 no Google</span>
            <span className="w-px h-3.5 bg-primary/20" />
            <span>+100 clientes encantadas</span>
            <span className="w-px h-3.5 bg-primary/20" />
            <span>hora marcada, sem fila</span>
          </motion.div>
        </motion.div>

        {/* Image col */}
        <motion.div
          className="relative max-[820px]:hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-[22px] overflow-hidden shadow-card-dark bg-primary-pale h-110 flex items-center justify-center">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt="Safira Nails"
                fill
                className="object-cover"
                sizes="(max-width: 820px) 0px, 45vw"
                priority
              />
            ) : (
              <span className="text-8xl opacity-30">💅</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
