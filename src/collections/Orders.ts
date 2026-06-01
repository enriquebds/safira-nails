import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    group: 'Loja',
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'customerWhatsapp', 'total', 'status', 'createdAt'],
  },
  fields: [
    { name: 'customerName', type: 'text', label: 'Nome do cliente' },
    { name: 'customerWhatsapp', type: 'text', label: 'WhatsApp do cliente' },
    {
      name: 'items',
      type: 'array',
      label: 'Itens do pedido',
      fields: [
        { name: 'productName', type: 'text', label: 'Produto' },
        { name: 'quantity', type: 'number', label: 'Quantidade' },
        { name: 'unitPrice', type: 'number', label: 'Preço unitário (centavos)' },
      ],
    },
    { name: 'total', type: 'number', label: 'Total (centavos)' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      label: 'Status',
      options: [
        { label: 'Aguardando', value: 'pending' },
        { label: 'Confirmado', value: 'confirmed' },
        { label: 'Em preparo', value: 'preparing' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregue', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Observações' },
  ],
  timestamps: true,
};
