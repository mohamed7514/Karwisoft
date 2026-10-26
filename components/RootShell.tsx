import type { ReactNode } from 'react';
import '../app/styles/styles.css';
import '../app/styles/presentation.css';
import '../app/styles/journey.css';
import '../app/styles/modes.css';
import '../app/styles/services.css';
import '../app/styles/service-detail.css';
import '../app/styles/responsive.css';
import '../app/styles/navigation.css';

// Shared <html> shell: each language has its own root layout so that <html lang> is correct in the static export.
export function RootShell({ lang, children }: { lang: string; children: ReactNode }) {
  return <html lang={lang}><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>;
}
