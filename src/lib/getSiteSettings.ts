import { getPayload } from '@/utils/payload';

export interface SiteSettingsData {
  whatsappNumber: string;
  whatsappPretty: string;
  instagramHandle: string;
  address: string;
  paymentMethods: string[];
  heroImageUrl: string | null;
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
  address: 'Avenida Alexandre Mackenzie, 529 - Jaguaré, São Paulo - SP, 05322-000',
  paymentMethods: ['Pix', 'Cartão de Crédito', 'Débito', 'Dinheiro'],
  heroImageUrl: null,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayload();
    const s = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    const number = (s.whatsappNumber as string) || FALLBACK.whatsappNumber;
    const methods = ((s.paymentMethods as { method: string }[] | null) ?? [])
      .map(p => p.method)
      .filter(Boolean);
    const heroImg = s.heroImage as { url?: string } | string | null | undefined;
    const heroImageUrl = typeof heroImg === 'object' && heroImg?.url ? heroImg.url : null;
    return {
      whatsappNumber: number,
      whatsappPretty: formatWhatsapp(number),
      instagramHandle: (s.instagramHandle as string) || FALLBACK.instagramHandle,
      address: (s.address as string) || FALLBACK.address,
      paymentMethods: methods.length ? methods : FALLBACK.paymentMethods,
      heroImageUrl,
    };
  } catch {
    return FALLBACK;
  }
}
