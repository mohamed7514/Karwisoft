import { ContactPage } from '../../../../components/pages/ContactPage';
import { contactPage } from '../../../../lib/i18n/dict-company';
import { pageMeta } from '../../../../lib/i18n/meta';

export const metadata = pageMeta('en', '/contact/', contactPage.en.metaTitle, contactPage.en.metaDescription);

export default function Page() {
  return <ContactPage locale="en" />;
}
