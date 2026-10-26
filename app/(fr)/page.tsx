import { HomePage } from '../../components/pages/HomePage';
import { pageMeta } from '../../lib/i18n/meta';

export const metadata = pageMeta('fr', '/', 'Karwisoft — Pourquoi votre prochain patient vous choisirait-il ?', 'Un patient cherche un dentiste. Il compare plusieurs cliniques. Pourquoi choisirait-il la vôtre ? Site web, Google Ads et référencement pour cliniques dentaires.');

export default function Page() {
  return <HomePage locale="fr" />;
}
