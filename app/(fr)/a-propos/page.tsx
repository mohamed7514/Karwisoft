import { AboutPage } from '../../../components/pages/AboutPage';
import { aboutPage } from '../../../lib/i18n/dict-company';
import { pageMeta } from '../../../lib/i18n/meta';

export const metadata = pageMeta('fr', '/a-propos/', aboutPage.fr.metaTitle, aboutPage.fr.metaDescription);

export default function Page() {
  return <AboutPage locale="fr" />;
}
