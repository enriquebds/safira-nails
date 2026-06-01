'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import { buildCartWhatsAppMessage } from '@/utils/whatsapp';
import { formatPrice } from '@/utils/formatters';

export function CartDrawer() {
  const { items, isOpen, closeCart, total, totalItems } = useCartStore();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  function handleCheckout() {
    if (!name.trim() || !whatsapp.trim()) return;
    const url = buildCartWhatsAppMessage(items, name, whatsapp);
    window.open(url, '_blank');
    setStep('cart');
    closeCart();
  }

  const inputClass = 'w-full border border-primary/30 dark:border-dark-text/20 rounded-xl px-4 py-3 bg-transparent text-brand-text dark:text-dark-text font-body text-[15px] outline-none focus:border-primary transition-colors';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-[rgba(20,2,30,0.5)] backdrop-blur-[6px] z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 h-full w-full max-w-[440px] bg-brand-offwhite dark:bg-dark-bg z-[71] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/20 dark:border-dark-text/10">
              <h2 className="font-display text-[21px] text-brand-text dark:text-dark-text font-bold flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.2 12.3a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></svg>
                Seu Carrinho{' '}
                {totalItems() > 0 && <span className="text-brand-muted dark:text-dark-muted font-normal">({totalItems()})</span>}
              </h2>
              <button onClick={closeCart} className="bg-transparent border-none text-brand-muted dark:text-dark-muted cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3.5">
              {items.length === 0 ? (
                <div className="text-center py-16 text-brand-muted dark:text-dark-muted">
                  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4 opacity-50"><path d="M12 6h24l8 10-20 26L4 16z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M4 16h40M12 6l8 10m8-10l-8 10m0 0l8 26m-8-26l-8 26" stroke="currentColor" strokeWidth="0.8" opacity="0.7" /></svg>
                  <p className="font-display text-[19px] text-brand-text dark:text-dark-text mb-1.5">Seu carrinho está vazio</p>
                  <p className="text-[14px]">Adicione produtos da nossa loja!</p>
                </div>
              ) : (
                items.map(item => <CartItem key={item.product.id} item={item} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-primary/20 dark:border-dark-text/10 flex flex-col gap-3.5">
                {step === 'cart' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] text-brand-muted dark:text-dark-muted">Total</span>
                      <span className="font-display font-bold text-[24px] text-primary">{formatPrice(total())}</span>
                    </div>
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full py-3.5 px-6 transition-colors text-[15px]"
                    >
                      Finalizar Pedido
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[14px] text-brand-muted dark:text-dark-muted">
                      Informe seus dados para enviarmos o pedido pelo WhatsApp:
                    </p>
                    <input
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Seu WhatsApp (11) 99999-9999"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      className={inputClass}
                    />
                    <button
                      onClick={handleCheckout}
                      disabled={!name.trim() || !whatsapp.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full py-3.5 px-6 transition-colors text-[15px]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
                      Enviar pelo WhatsApp
                    </button>
                    <button onClick={() => setStep('cart')} className="bg-transparent border-none text-[14px] text-brand-muted dark:text-dark-muted cursor-pointer hover:text-primary transition-colors">
                      ← Voltar ao carrinho
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
