import { getPayload } from '@/utils/payload';
import { PageHeader } from '@/components/features/PageHeader/PageHeader';
import { LojaClient } from './LojaClient';

export const dynamic = 'force-dynamic';

export default async function LojaPage() {
  const payload = await getPayload();
  const { docs: products } = await payload.find({
    collection: 'products',
    where: { active: { equals: true } },
    sort: 'name',
    limit: 100,
  });

  return (
    <>
      <PageHeader over="nossa" title="Loja" sub="Produtos selecionados para suas unhas ficarem perfeitas em casa também." />
      <LojaClient products={products as never} />
    </>
  );
}
