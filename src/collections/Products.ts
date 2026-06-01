import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Loja',
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'price', 'stock', 'active'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome do produto' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Foto principal' },
    {
      name: 'images',
      type: 'array',
      label: 'Fotos adicionais',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', label: 'Foto' }],
    },
    { name: 'description', type: 'textarea', required: true, label: 'Descrição' },
    { name: 'price', type: 'number', required: true, label: 'Preço (em centavos)', admin: { description: 'Ex: R$ 45,90 → 4590' } },
    { name: 'stock', type: 'number', required: true, defaultValue: 0, label: 'Estoque' },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Esmalte', value: 'esmalte' },
        { label: 'Gel', value: 'gel' },
        { label: 'Acrílico', value: 'acrilico' },
        { label: 'Decoração', value: 'decoracao' },
        { label: 'Cuidados', value: 'cuidados' },
        { label: 'Kit', value: 'kit' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Ativo na loja' },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Destaque na home' },
    { name: 'slug', type: 'text', unique: true, label: 'Slug (URL amigável)' },
  ],
};
