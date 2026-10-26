import { ServicesPage } from '../../../components/pages/ServicesPage';
import { servicesPage } from '../../../lib/i18n/dict';
import { pageMeta } from '../../../lib/i18n/meta';

export const metadata = pageMeta('fr', '/services/', servicesPage.fr.metaTitle, servicesPage.fr.metaDescription);

export default function Page() {
  return <ServicesPage locale="fr" />;
}
