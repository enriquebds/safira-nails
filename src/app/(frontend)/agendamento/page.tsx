import { getPayload } from '@/utils/payload';
import { PageHeader } from '@/components/features/PageHeader/PageHeader';
import { BookingForm } from '@/components/features/BookingForm/BookingForm';

export const dynamic = 'force-dynamic';

export default async function AgendamentoPage() {
  let services: never[] = [];
  try {
    const payload = await getPayload();
    const { docs } = await payload.find({
      collection: 'services',
      where: { active: { equals: true } },
      sort: 'order',
    });
    services = docs as never[];
  } catch (err) {
    console.error('[AgendamentoPage] failed to load services:', err);
  }

  return (
    <>
      <PageHeader
        over="vamos marcar"
        title="Agendamento"
        sub="Preencha os dados abaixo e enviaremos seu pedido de horário direto pelo WhatsApp."
      />
      <BookingForm services={services} />
    </>
  );
}
