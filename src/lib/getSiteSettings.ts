import { getPayload } from '@/utils/payload';

export interface SiteSettingsData {
  whatsappNumber: string;
  whatsappPretty: string;
  instagramHandle: string;
  address: string;
  paymentMethods: string[];
}

function formatWhatsapp(number: string): string {
  const digits = number.replace(/\D/g, '');
  const local = digits.startsWith('55') ? digits.slice(2) : digits;
  if (local.length === 11) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
}

const FALLBACK: SiteSettingsData = {
  whatsappNumber: '5511976480983',
  whatsappPretty: '(11) 97648-0983',
  instagramHandle: 'safira.nls',
  address: 'Taboão da Serra, SP',
  paymentMethods: ['Pix', 'Cartão de Crédito', 'Débito', 'Dinheiro'],
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayload();
    const s = await payload.findGlobal({ slug: 'site-settings' });
    const number = (s.whatsappNumber as string) || FALLBACK.whatsappNumber;
    const methods = ((s.paymentMethods as { method: string }[] | null) ?? [])
      .map(p => p.method)
      .filter(Boolean);
    return {
      whatsappNumber: number,
      whatsappPretty: formatWhatsapp(number),
      instagramHandle: (s.instagramHandle as string) || FALLBACK.instagramHandle,
      address: (s.address as string) || FALLBACK.address,
      paymentMethods: methods.length ? methods : FALLBACK.paymentMethods,
    };
  } catch {
    return FALLBACK;
  }
}
