import { ServicesPage } from '../../../../components/pages/ServicesPage';
import { servicesPage } from '../../../../lib/i18n/dict';
import { pageMeta } from '../../../../lib/i18n/meta';

export const metadata = pageMeta('en', '/services/', servicesPage.en.metaTitle, servicesPage.en.metaDescription);

export default function Page() {
  return <ServicesPage locale="en" />;
}
