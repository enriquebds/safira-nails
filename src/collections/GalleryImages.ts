import type { CollectionConfig } from 'payload';

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'alt',
    defaultColumns: ['image', 'category', 'featured', 'active'],
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Foto' },
    { name: 'alt', type: 'text', required: true, label: 'Descrição da foto' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'French', value: 'french' },
        { label: 'Gel', value: 'gel' },
        { label: 'Dark', value: 'dark' },
        { label: 'Colorido', value: 'colorido' },
        { label: 'Encapsulada', value: 'encapsulada' },
        { label: 'Decorada', value: 'decorada' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Destaque' },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Ativa' },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Ordem' },
  ],
};
