import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  whatsapp: z
    .string()
    .min(14, 'WhatsApp inválido')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (xx) xxxxx-xxxx'),
  service: z.string().min(1, 'Selecione um serviço'),
  date: z.string().min(1, 'Selecione uma data'),
  period: z.enum(['Manhã', 'Tarde', 'Noite'], {
    errorMap: () => ({ message: 'Selecione um período' }),
  }),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
