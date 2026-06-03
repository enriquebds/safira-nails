'use client';

import { createContext, useContext } from 'react';
import type { SiteSettingsData } from '@/lib/getSiteSettings';

const DEFAULT: SiteSettingsData = {
  whatsappNumber: '5511976480983',
  whatsappPretty: '(11) 97648-0983',
  instagramHandle: 'safira.nls',
  address: 'Taboão da Serra, SP',
  paymentMethods: ['Pix', 'Cartão de Crédito', 'Débito', 'Dinheiro'],
};

const SiteSettingsContext = createContext<SiteSettingsData>(DEFAULT);

export function SiteSettingsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SiteSettingsData;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
