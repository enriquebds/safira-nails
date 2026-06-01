import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'active'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Nome do serviço' },
    { name: 'icon', type: 'text', label: 'Emoji/ícone', admin: { description: 'Ex: 💅 ou 💎' } },
    { name: 'description', type: 'textarea', required: true, label: 'Descrição' },
    {
      name: 'items',
      type: 'array',
      label: 'Itens e preços',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Nome do item' },
        { name: 'price', type: 'text', required: true, label: 'Preço (ex: R$ 90,00)' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Ativo' },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 0 },
  ],
};
