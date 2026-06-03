import { getPayload } from '@/utils/payload';
import { Hero } from '@/components/features/Hero/Hero';
import { ServicesSection } from '@/components/features/ServicesSection/ServicesSection';
import { FeaturedProducts } from '@/components/features/FeaturedProducts/FeaturedProducts';
import { GallerySection } from '@/components/features/GallerySection/GallerySection';
import { BookingBand } from '@/components/features/BookingBand/BookingBand';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let services: never[] = [];
  let products: never[] = [];
  let images: never[] = [];

  try {
    const payload = await getPayload();
    const [servicesResult, productsResult, galleryResult] = await Promise.all([
      payload.find({ collection: 'services', where: { active: { equals: true } }, sort: 'order', limit: 12 }),
      payload.find({ collection: 'products', where: { active: { equals: true }, featured: { equals: true } }, limit: 8 }),
      payload.find({ collection: 'gallery-images', where: { active: { equals: true } }, sort: 'order', limit: 24 }),
    ]);
    services = servicesResult.docs as never[];
    products = productsResult.docs as never[];
    images = galleryResult.docs as never[];
  } catch (err) {
    console.error('[HomePage] failed to load data from database:', err);
  }

  return (
    <>
      <Hero />
      <ServicesSection services={services} />
      <FeaturedProducts products={products} />
      <GallerySection images={images} />
      <BookingBand />
    </>
  );
}
