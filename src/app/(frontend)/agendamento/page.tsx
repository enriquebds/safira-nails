import { getPayload } from '@/utils/payload';
import { PageHeader } from '@/components/features/PageHeader/PageHeader';
import { BookingForm } from '@/components/features/BookingForm/BookingForm';

export const revalidate = 3600;

export default async function AgendamentoPage() {
  const payload = await getPayload();
  const { docs: services } = await payload.find({
    collection: 'services',
    where: { active: { equals: true } },
    sort: 'order',
  });

  return (
    <>
      <PageHeader
        over="vamos marcar"
        title="Agendamento"
        sub="Preencha os dados abaixo e enviaremos seu pedido de horário direto pelo WhatsApp."
      />
      <BookingForm services={services as never} />
    </>
  );
}
