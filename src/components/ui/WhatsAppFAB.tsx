'use client';

import { motion } from 'framer-motion';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

export function WhatsAppFAB() {
  return (
    <motion.a
      href={buildGenericBookingMessage()}
      target="_blank"
      rel="noopener noreferrer"
      title="Fale conosco no WhatsApp"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      className="fixed right-5 bottom-5 z-45 w-[58px] h-[58px] rounded-full bg-[#25D366] shadow-[0_8px_28px_rgba(37,211,102,0.5)] flex items-center justify-center"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z M9 9.5c0 4 3 6.5 5.5 6.5.8 0 1.5-.7 1.5-1.3 0-.4-1.8-1.4-2.2-1.2-.5.3-.8 1-1.3.7-1.2-.6-2.1-1.6-2.4-2.7-.1-.5.5-.8.8-1.3.2-.4-.8-2.2-1.2-2.2-.6 0-1.3.7-1.3 1.5z" />
      </svg>
    </motion.a>
  );
}
