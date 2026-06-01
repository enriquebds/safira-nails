'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatters';
import type { CartItem as CartItemType } from '@/types/cart';

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);

  return (
    <div className="flex gap-3.5 bg-white dark:bg-dark-elevated rounded-[14px] p-3 border border-primary/10 dark:border-dark-text/10">
      <div className="w-[72px] h-[72px] rounded-[10px] overflow-hidden flex-shrink-0 bg-primary-pale dark:bg-dark-elevated flex items-center justify-center">
        {item.product.image ? (
          <Image src={item.product.image} alt={item.product.name} width={72} height={72} className="object-cover w-full h-full" />
        ) : (
          <span className="text-2xl">💎</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-[15px] text-brand-text dark:text-dark-text font-semibold leading-tight mb-1">
          {item.product.name}
        </h4>
        <div className="text-primary font-bold text-[15px] mb-2">{formatPrice(item.product.price)}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 border border-primary/20 rounded-full p-[3px]">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-[26px] h-[26px] rounded-full border-none bg-brand-surface dark:bg-dark-surface text-brand-text dark:text-dark-text cursor-pointer flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14" /></svg>
            </button>
            <span className="min-w-[22px] text-center font-semibold text-brand-text dark:text-dark-text text-[14px]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-[26px] h-[26px] rounded-full border-none bg-primary text-white cursor-pointer flex items-center justify-center hover:bg-primary-dark transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="bg-transparent border-none text-brand-muted dark:text-dark-muted cursor-pointer p-1 hover:text-accent transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
