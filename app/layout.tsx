import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './styles/styles.css';
import './styles/presentation.css';
import './styles/journey.css';
import './styles/modes.css';
import './styles/services.css';

export const metadata: Metadata = {
  title: 'Karwisoft — Pourquoi votre prochain patient vous choisirait-il ?',
  description: 'Un patient cherche un dentiste. Il compare plusieurs cliniques. Pourquoi choisirait-il la vôtre ? Découvrez le parcours Karwisoft, de Google Ads à l’après-visite.',
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#f5f2ec' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="fr-CA"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>;
}
