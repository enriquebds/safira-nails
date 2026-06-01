'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/features/ProductCard/ProductCard';

const CATS = [
  { v: 'todos', l: 'Todos' },
  { v: 'esmalte', l: 'Esmalte' },
  { v: 'gel', l: 'Gel' },
  { v: 'acrilico', l: 'Acrílico' },
  { v: 'decoracao', l: 'Decoração' },
  { v: 'cuidados', l: 'Cuidados' },
  { v: 'kit', l: 'Kits' },
];

interface Product {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  stock: number;
  featured?: boolean;
  category?: string | null;
  image: { url?: string | null; alt?: string; sizes?: { card?: { url?: string | null } } } | string;
}

export function LojaClient({ products }: { products: Product[] }) {
  const [cat, setCat] = useState('todos');
  const filtered = cat === 'todos' ? products : products.filter(p => p.category === cat);

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-10 pb-20">
      <div className="flex gap-2.5 flex-wrap justify-center mb-9">
        {CATS.map(g => (
          <button
            key={g.v}
            onClick={() => setCat(g.v)}
            className={`px-5 py-[9px] rounded-full text-[14px] font-medium border transition-colors ${
              cat === g.v
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent text-brand-muted dark:text-dark-muted border-primary/20 dark:border-dark-text/20 hover:border-primary hover:text-primary'
            }`}
          >
            {g.l}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-brand-muted dark:text-dark-muted py-16">Nenhum produto nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
