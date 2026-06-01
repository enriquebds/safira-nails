import type { CartItem } from '@/types/cart';
import { WHATSAPP_NUMBER } from './constants';
import { formatPrice } from './formatters';

export interface BookingFormData {
  name: string;
  whatsapp: string;
  service: string;
  date: string;
  period: string;
  notes?: string;
}

export function buildWhatsAppBookingMessage(data: BookingFormData): string {
  const text =
    `Olá! Gostaria de agendar um horário na Safira Nails 💅\n\n` +
    `*Nome:* ${data.name}\n` +
    `*WhatsApp:* ${data.whatsapp}\n` +
    `*Serviço:* ${data.service}\n` +
    `*Data desejada:* ${data.date}\n` +
    `*Período:* ${data.period}\n` +
    (data.notes ? `*Observações:* ${data.notes}` : '');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildCartWhatsAppMessage(
  items: CartItem[],
  customerName: string,
  customerWhatsapp: string,
): string {
  const itemsText = items
    .map(i => `• ${i.product.name} × ${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`)
    .join('\n');
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const text =
    `Olá! Gostaria de fazer um pedido na Safira Nails 💅\n\n` +
    `*Nome:* ${customerName}\n` +
    `*Meu WhatsApp:* ${customerWhatsapp}\n\n` +
    `*🛍️ Itens do pedido:*\n${itemsText}\n\n` +
    `*💰 Total: ${formatPrice(total)}*\n\n` +
    `Aguardo confirmação de disponibilidade e forma de entrega/retirada! 🙏`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildGenericBookingMessage(): string {
  const text = `Olá! Gostaria de agendar um horário na Safira Nails 💅`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
