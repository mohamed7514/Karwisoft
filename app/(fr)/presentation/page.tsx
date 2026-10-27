import type { Metadata } from 'next';
import { Deck } from '../../../components/deck/Deck';

export const metadata: Metadata = {
  title: 'Présentation — Karwisoft',
  description: 'Présentation commerciale pour cliniques dentaires.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Deck />;
}
