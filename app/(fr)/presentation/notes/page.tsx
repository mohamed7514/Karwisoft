import type { Metadata } from 'next';
import { PresenterNotes } from '../../../../components/deck/PresenterNotes';

export const metadata: Metadata = {
  title: 'Notes de présentation — Karwisoft',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PresenterNotes />;
}
