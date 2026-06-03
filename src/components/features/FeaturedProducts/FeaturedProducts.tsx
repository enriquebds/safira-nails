'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProductCard } from '@/components/features/ProductCard/ProductCard';

interface Product {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  stock: number;
  featured?: boolean;
  image: { url?: string | null; alt?: string; sizes?: { card?: { url?: string | null } } } | string;
  description?: string;
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (products.length === 0) return null;

  return (
    <section className="bg-brand-surface dark:bg-dark-surface py-[clamp(56px,8vw,88px)] px-6">
      <div className="max-w-[1280px] mx-auto">
        <SectionTitle title="Nossa Loja" />
        <div ref={ref} className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-9">
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-primary text-primary hover:brightness-105 font-semibold rounded-full py-[15px] px-[30px] text-[16px] transition-all hover:-translate-y-0.5"
          >
            Ver todos os produtos
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6l6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
