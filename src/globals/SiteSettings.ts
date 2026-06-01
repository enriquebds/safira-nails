import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Configurações' },
  label: 'Configurações do Site',
  fields: [
    { name: 'whatsappNumber', type: 'text', label: 'Número WhatsApp (somente dígitos)', defaultValue: '5511976480983' },
    { name: 'instagramHandle', type: 'text', label: 'Instagram (sem @)', defaultValue: 'safira.nls' },
    { name: 'address', type: 'text', label: 'Endereço', defaultValue: 'Taboão da Serra, SP' },
    { name: 'heroTitle', type: 'text', label: 'Título do Hero' },
    { name: 'heroSubtitle', type: 'textarea', label: 'Subtítulo do Hero' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagem principal do Hero' },
    {
      name: 'paymentMethods',
      type: 'array',
      label: 'Formas de pagamento',
      fields: [{ name: 'method', type: 'text', label: 'Método' }],
    },
  ],
};
