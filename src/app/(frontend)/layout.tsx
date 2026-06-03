import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { CartDrawer } from '@/components/features/Cart/CartDrawer';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import { getSiteSettings } from '@/lib/getSiteSettings';

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <SiteSettingsProvider value={settings}>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFAB />
    </SiteSettingsProvider>
  );
}
