import { notFound } from 'next/navigation';
import { getPayload } from '@/utils/payload';
import { ProductDetails } from '@/components/features/ProductDetails/ProductDetails';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload();

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, active: { equals: true } },
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

  const related = (relatedDocs as unknown as ProductDoc[]).filter(p => p.id !== product.id).slice(0, 4);

  const finalRelated = related.length >= 2
    ? related
    : (await payload.find({ collection: 'products', where: { active: { equals: true } }, limit: 5 })).docs
        .filter((p: { id: string | number }) => String(p.id) !== String(product.id))
        .slice(0, 4) as unknown as ProductDoc[];

  return <ProductDetails product={product} related={finalRelated} />;
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload();
    const { docs } = await payload.find({ collection: 'products', limit: 200 });
    return docs.filter(p => p.slug).map(p => ({ slug: p.slug as string }));
  } catch {
    return [];
  }
}
