import { getPayload } from '@/utils/payload';
import { Hero } from '@/components/features/Hero/Hero';
import { ServicesSection } from '@/components/features/ServicesSection/ServicesSection';
import { FeaturedProducts } from '@/components/features/FeaturedProducts/FeaturedProducts';
import { GallerySection } from '@/components/features/GallerySection/GallerySection';
import { BookingBand } from '@/components/features/BookingBand/BookingBand';

export const revalidate = 3600;

export default async function HomePage() {
  const payload = await getPayload();

  const [servicesResult, productsResult, galleryResult] = await Promise.all([
    payload.find({ collection: 'services', where: { active: { equals: true } }, sort: 'order', limit: 12 }),
    payload.find({ collection: 'products', where: { active: { equals: true }, featured: { equals: true } }, limit: 8 }),
    payload.find({ collection: 'gallery-images', where: { active: { equals: true } }, sort: 'order', limit: 24 }),
  ]);

  return (
    <>
      <Hero />
      <ServicesSection services={servicesResult.docs as never} />
      <FeaturedProducts products={productsResult.docs as never} />
      <GallerySection images={galleryResult.docs as never} />
      <BookingBand />
    </>
  );
}
