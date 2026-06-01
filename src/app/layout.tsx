import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Safira Nails — Estúdio de Nail Design',
  description: 'Transformamos suas unhas em verdadeiras obras de arte. Agende seu horário em Taboão da Serra, SP.',
  openGraph: {
    title: 'Safira Nails',
    description: 'Estúdio de Nail Design em Taboão da Serra, SP',
  },
  themeColor: '#9B3FC8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
