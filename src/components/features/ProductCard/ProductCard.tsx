'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatters';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug?: string | null;
    price: number;
    stock: number;
    featured?: boolean;
    image: { url?: string | null; alt?: string; sizes?: { card?: { url?: string | null } } } | string;
    description?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem);
  const cartQty = useCartStore(s => s.items.find(i => i.product.id === product.id)?.quantity ?? 0);
  const soldOut = product.stock === 0;
  const atMax = cartQty >= product.stock;

  const imageUrl =
    typeof product.image === 'object'
      ? (product.image?.sizes?.card?.url ?? product.image?.url ?? '')
      : '';
  const imageAlt =
    typeof product.image === 'object' ? (product.image?.alt ?? product.name) : product.name;

  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(155,63,200,0.25)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-dark-surface rounded-[18px] overflow-hidden border border-primary/10 dark:border-dark-text/10 flex flex-col shadow-card dark:shadow-card-dark"
    >
      <Link href={`/loja?product_id=${product.id}`} className="block relative aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-pale to-primary-light/50 flex items-center justify-center">
            <span className="text-4xl opacity-50">💎</span>
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-[13px] bg-black/60 px-3 py-1 rounded-full">Esgotado</span>
          </div>
        )}
        {!soldOut && product.stock <= 3 && (
          <span className="absolute top-3 right-3 bg-accent/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            Últimas {product.stock}
          </span>
        )}
        {product.featured && !soldOut && (
          <span className="absolute top-3 left-3 bg-accent text-white text-[11px] font-bold px-[11px] py-[5px] rounded-full flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z" /></svg>
            Destaque
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2.5">
        <Link href={`/loja?product_id=${product.id}`}>
          <h3 className="font-display text-[17px] text-brand-text dark:text-dark-text font-semibold leading-tight hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2.5">
          <span className="text-[19px] text-primary font-bold">{formatPrice(product.price)}</span>
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: imageUrl,
                slug: product.slug ?? '',
                stock: product.stock,
              })
            }
            disabled={soldOut || atMax}
            className="inline-flex items-center gap-1.5 bg-primary disabled:bg-primary/30 text-white disabled:text-brand-muted rounded-full px-[14px] py-[9px] text-[13px] font-semibold cursor-pointer disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Adicionar
          </button>
        </div>
      </div>
    </motion.article>
  );
}
