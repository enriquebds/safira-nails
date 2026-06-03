import { notFound } from 'next/navigation';
import { getPayload } from '@/utils/payload';
import { PageHeader } from '@/components/features/PageHeader/PageHeader';
import { ProductDetails } from '@/components/features/ProductDetails/ProductDetails';
import { LojaClient } from './LojaClient';

export const dynamic = 'force-dynamic';

interface ProductDoc {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  stock: number;
  featured?: boolean;
  description: string;
  category?: string | null;
  image: { url?: string | null; alt?: string; sizes?: { card?: { url?: string | null } } } | string;
  images?: { image: { url?: string | null } | string }[] | null;
}

export default async function LojaPage({
  searchParams,
}: {
  searchParams: Promise<{ product_id?: string }>;
}) {
  const { product_id } = await searchParams;
  const payload = await getPayload();

  if (product_id) {
    const { docs } = await payload.find({
      collection: 'products',
      where: { id: { equals: product_id }, active: { equals: true } },
      limit: 1,
    });

    if (!docs[0]) notFound();

    const product = docs[0] as unknown as ProductDoc;

    const { docs: relatedDocs } = await payload.find({
      collection: 'products',
      where: {
        active: { equals: true },
        ...(product.category ? { category: { equals: product.category } } : {}),
      },
      limit: 5,
    });

    const related = (relatedDocs as unknown as ProductDoc[])
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    const finalRelated =
      related.length >= 2
        ? related
        : ((
            await payload.find({
              collection: 'products',
              where: { active: { equals: true } },
              limit: 5,
            })
          ).docs as unknown as ProductDoc[])
            .filter(p => String(p.id) !== String(product.id))
            .slice(0, 4);

    return <ProductDetails product={product} related={finalRelated} />;
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { active: { equals: true } },
    sort: 'name',
    limit: 100,
  });

  return (
    <>
      <PageHeader
        over="nossa"
        title="Loja"
        sub="Produtos selecionados para suas unhas ficarem perfeitas em casa também."
      />
      <LojaClient products={products as never} />
    </>
  );
}
