import type { Viewport } from 'next';
import type { ReactNode } from 'react';
import { RootShell } from '../../components/RootShell';
import { siteUrl } from '../../lib/i18n/meta';

export const metadata = { metadataBase: new URL(siteUrl), icons: { icon: '/icon.svg' } };
export const viewport: Viewport = { themeColor: '#f5f2ec' };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
