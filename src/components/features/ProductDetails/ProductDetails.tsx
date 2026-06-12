'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/features/ProductCard/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { formatPrice } from '@/utils/formatters';
import { buildGenericBookingMessage } from '@/utils/whatsapp';

interface MediaImage {
  url?: string | null;
  alt?: string;
  sizes?: { card?: { url?: string | null }; thumbnail?: { url?: string | null } };
}

interface Product {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  stock: number;
  featured?: boolean;
  description: string;
  category?: string | null;
  image: MediaImage | string;
  images?: { image: MediaImage | string }[] | null;
}

const CAT_LABELS: Record<string, string> = {
  esmalte: 'Esmalte', gel: 'Gel', acrilico: 'Acrílico',
  decoracao: 'Decoração', cuidados: 'Cuidados', kit: 'Kit',
};

function getUrl(img: MediaImage | string | undefined | null): string {
  if (!img) return '';
  if (typeof img === 'string') return img;
  return img.sizes?.card?.url ?? img.url ?? '';
}

export function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  const addItem = useCartStore(s => s.addItem);
  const cartQty = useCartStore(s => s.items.find(i => i.product.id === product.id)?.quantity ?? 0);
  const [qty, setQty] = useState(1);

  const mainUrl = getUrl(product.image);
  const additionalImages = product.images?.map(i => getUrl(i.image)).filter(Boolean) ?? [];
  const allImages = [mainUrl, ...additionalImages].filter(Boolean);
  const [activeImg, setActiveImg] = useState(0);

  const soldOut = product.stock === 0;
  const catLabel = product.category ? (CAT_LABELS[product.category] ?? product.category) : '';

  const available = product.stock - cartQty;

  function handleAdd() {
    const canAdd = Math.min(qty, available);
    for (let i = 0; i < canAdd; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainUrl,
        slug: product.slug ?? '',
        stock: product.stock,
      });
    }
  }

  return (
    <>
      <section className="max-w-[1180px] mx-auto px-6 py-[clamp(24px,4vw,48px)] pb-16">
        <Link href="/loja" className="inline-flex items-center gap-1.5 text-brand-muted dark:text-dark-muted text-[14px] mb-7 hover:text-primary transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m6 6l-6-6 6-6" /></svg>
          Voltar à loja
        </Link>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(28px,4vw,56px)] items-start">
          {/* Gallery */}
          <div>
            <div className="rounded-[24px] overflow-hidden shadow-card dark:shadow-card-dark relative h-[460px]">
              {allImages[activeImg] ? (
                <Image src={allImages[activeImg]!} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full bg-primary-pale dark:bg-dark-elevated flex items-center justify-center"><span className="text-8xl opacity-30">💎</span></div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-3.5">
                {allImages.slice(0, 3).map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-[12px] overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-primary' : 'border-transparent'}`}
                  >
                    {url && <Image src={url} alt="" width={80} height={80} className="object-cover w-full h-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {catLabel && (
              <span className="text-[12px] uppercase tracking-[2px] text-primary font-semibold">{catLabel}</span>
            )}
            <h1 className="font-display text-[clamp(28px,4vw,40px)] text-brand-text dark:text-dark-text font-bold mt-2 mb-3.5 leading-[1.15]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3.5 mb-5">
              <span className="font-display text-[34px] text-primary font-bold">{formatPrice(product.price)}</span>
              <span
                className={`text-[13px] font-semibold px-3 py-[5px] rounded-full ${
                  soldOut
                    ? 'bg-red-100 text-red-600'
                    : 'bg-primary-pale text-primary-dark'
                }`}
              >
                {soldOut ? 'Esgotado' : `${product.stock} em estoque`}
              </span>
            </div>

            <p className="text-[16px] text-brand-muted dark:text-dark-muted leading-[1.7] mb-7">{product.description}</p>

            {!soldOut && (
              <div className="flex items-center gap-4 mb-5 flex-wrap">
                <div className="flex items-center gap-1.5 border-[1.5px] border-primary/20 rounded-full p-[5px]">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-[34px] h-[34px] rounded-full bg-brand-surface dark:bg-dark-surface text-brand-text dark:text-dark-text border-none cursor-pointer flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  </button>
                  <span className="min-w-[30px] text-center font-bold text-brand-text dark:text-dark-text text-[16px]">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(available, q + 1))}
                    className="w-[34px] h-[34px] rounded-full bg-primary text-white border-none cursor-pointer flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
                <span className="text-[14px] text-brand-muted dark:text-dark-muted">
                  Subtotal: <strong className="text-brand-text dark:text-dark-text">{formatPrice(product.price * qty)}</strong>
                </span>
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleAdd}
                disabled={soldOut || available <= 0}
                className="inline-flex items-center gap-2 bg-primary disabled:opacity-40 hover:bg-primary-dark text-white font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.2 12.3a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></svg>
                {soldOut || available <= 0 ? 'Indisponível' : 'Adicionar ao carrinho'}
              </button>
              <a
                href={buildGenericBookingMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-primary text-primary font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5 hover:brightness-105"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>
                Tirar dúvida
              </a>
            </div>

            <div className="mt-7 pt-6 border-t border-primary/10 dark:border-dark-text/10 flex flex-col gap-3">
              {[
                ['Pagamento via Pix, cartão ou dinheiro', 'check'],
                ['Retirada em Taboão da Serra, SP', 'pin'],
                ['Pedido finalizado pelo WhatsApp', 'whatsapp'],
              ].map(([text, icon]) => (
                <div key={text} className="flex items-center gap-2.5 text-brand-muted dark:text-dark-muted text-[14px]">
                  <span className="w-8 h-8 rounded-full bg-primary-pale dark:bg-dark-surface flex items-center justify-center flex-shrink-0 text-primary">
                    {icon === 'check' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 12l5 5L20 6" /></svg>}
                    {icon === 'pin' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>}
                    {icon === 'whatsapp' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8 8 0 1 1 8 19.3L3 21z" /></svg>}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-brand-surface dark:bg-dark-surface py-[clamp(48px,7vw,72px)] px-6">
          <div className="max-w-[1280px] mx-auto">
            <SectionTitle over="você também vai amar" title="Outros produtos" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
