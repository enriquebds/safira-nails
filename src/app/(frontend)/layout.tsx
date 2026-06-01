import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { CartDrawer } from '@/components/features/Cart/CartDrawer';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFAB />
    </>
  );
}
