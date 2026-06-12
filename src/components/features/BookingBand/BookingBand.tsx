'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

export function BookingBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="bg-primary-dark text-white px-6 py-[clamp(56px,8vw,88px)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="max-w-[1280px] mx-auto text-center"
      >
        <div className="font-script text-[34px] opacity-80 mb-1">vamos cuidar de você</div>
        <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold mb-4">Pronta para unhas de joia?</h2>
        <p className="text-[17px] opacity-85 max-w-[480px] mx-auto mb-8 leading-[1.6]">
          Agende seu horário em poucos cliques. Atendimento com hora marcada, sem filas.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/agendamento"
            className="inline-flex items-center gap-2 bg-white text-primary-dark font-semibold rounded-full py-[15px] px-[30px] text-[16px] hover:brightness-105 transition-all hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v3m8-3v3" /></svg>
            Agendar agora
          </Link>
          <a
            href={buildGenericBookingMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold rounded-full py-[15px] px-[30px] text-[16px] hover:bg-white/20 transition-all hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
            Chamar no WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
