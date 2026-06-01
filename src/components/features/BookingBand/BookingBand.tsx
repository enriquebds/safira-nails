'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

export function BookingBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="px-6 pb-20 pt-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="max-w-[1280px] mx-auto rounded-[28px] px-[clamp(36px,6vw,64px)] py-[clamp(36px,6vw,64px)] text-center text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #9B3FC8, #E879A0)' }}
      >
        <span className="absolute top-[-20px] left-[30px] opacity-25 pointer-events-none">
          <svg width="70" height="70" viewBox="0 0 48 48" fill="none"><path d="M24 4c1.5 11 5 14.5 16 16-11 1.5-14.5 5-16 16-1.5-11-5-14.5-16-16 11-1.5 14.5-5 16-16z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" /></svg>
        </span>
        <span className="absolute bottom-[-10px] right-[40px] opacity-20 pointer-events-none">
          <svg width="90" height="90" viewBox="0 0 48 48" fill="none"><path d="M12 6h24l8 10-20 26L4 16z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" /></svg>
        </span>
        <div className="font-script text-[34px] mb-1">vamos cuidar de você</div>
        <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold mb-3.5">Pronta para unhas de joia?</h2>
        <p className="text-[17px] opacity-92 max-w-[520px] mx-auto mb-7 leading-[1.6]">
          Agende seu horário em poucos cliques. Atendimento com hora marcada, sem filas.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/agendamento"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold rounded-full py-[15px] px-[30px] text-[16px] hover:brightness-105 transition-all hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v3m8-3v3" /></svg>
            Agendar agora
          </Link>
          <a
            href={buildGenericBookingMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold rounded-full py-[15px] px-[30px] text-[16px] hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
            Chamar no WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
