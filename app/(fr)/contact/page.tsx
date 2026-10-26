import { ContactPage } from '../../../components/pages/ContactPage';
import { contactPage } from '../../../lib/i18n/dict-company';
import { pageMeta } from '../../../lib/i18n/meta';

export const metadata = pageMeta('fr', '/contact/', contactPage.fr.metaTitle, contactPage.fr.metaDescription);

export default function Page() {
  return <ContactPage locale="fr" />;
}
