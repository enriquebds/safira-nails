'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

const CATS = ['Todas', 'French', 'Gel', 'Dark', 'Colorido', 'Encapsulada', 'Decorada'];

interface GalleryImage {
  id: string;
  alt: string;
  category: string;
  image: { url?: string | null; sizes?: { card?: { url?: string | null } } } | string;
}

export function GallerySection({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState('Todas');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = filter === 'Todas'
    ? images
    : images.filter(g => g.category.toLowerCase() === filter.toLowerCase());

  const move = useCallback((dir: number) => {
    setLightboxIdx(i => i === null ? null : (i + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, move]);

  const getUrl = (img: GalleryImage['image']) =>
    typeof img === 'object' ? (img?.sizes?.card?.url ?? img?.url ?? '') : '';

  return (
    <section id="galeria" className="scroll-mt-20 py-[clamp(56px,8vw,88px)] px-6 max-w-[1280px] mx-auto">
      <SectionTitle title="Galeria" />

      {/* Filters */}
      <div className="flex gap-2.5 flex-wrap justify-center mb-7">
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-[18px] py-2 rounded-full text-[14px] font-medium border transition-colors ${
              filter === cat
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent text-brand-muted dark:text-dark-muted border-primary/20 dark:border-dark-text/20 hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
        <AnimatePresence>
          {filtered.map((g, i) => {
            const url = getUrl(g.image);
            return (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIdx(i)}
                className="cursor-pointer rounded-[16px] overflow-hidden relative group"
              >
                {url ? (
                  <div className="relative h-[230px]">
                    <Image
                      src={url}
                      alt={g.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-[11px] uppercase tracking-[1.5px]">{g.category}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-[230px] bg-primary-pale dark:bg-dark-elevated flex items-center justify-center">
                    <span className="text-primary text-[11px] uppercase tracking-[1.5px] opacity-70">{g.category}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {images.length === 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-[230px] rounded-[16px] bg-primary-pale dark:bg-dark-elevated flex items-center justify-center">
              <span className="text-4xl opacity-30">💅</span>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && filtered[lightboxIdx] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-[80] bg-[rgba(15,1,24,0.82)] backdrop-blur-[8px] flex items-center justify-center"
          >
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(null); }}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <button
              onClick={e => { e.stopPropagation(); move(-1); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m6 6l-6-6 6-6" /></svg>
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-[min(560px,86vw)]"
            >
              {(() => {
                const url = getUrl(filtered[lightboxIdx].image);
                return url ? (
                  <div className="rounded-[18px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.5)] relative h-[min(560px,70vh)]">
                    <Image src={url} alt={filtered[lightboxIdx].alt} fill className="object-cover" sizes="560px" />
                  </div>
                ) : (
                  <div className="rounded-[18px] overflow-hidden h-[400px] bg-primary-pale dark:bg-dark-elevated" />
                );
              })()}
              <div className="text-center text-white mt-3.5">
                <span className="text-[12px] uppercase tracking-[2px] opacity-70">{filtered[lightboxIdx].category}</span>
                <span className="ml-3 opacity-50 tabular-nums">{lightboxIdx + 1} / {filtered.length}</span>
              </div>
            </motion.div>

            <button
              onClick={e => { e.stopPropagation(); move(1); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6l6 6-6 6" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
