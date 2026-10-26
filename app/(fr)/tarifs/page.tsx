import { PricingPage } from '../../../components/pages/PricingPage';
import { pricingPage } from '../../../lib/i18n/dict';
import { pageMeta } from '../../../lib/i18n/meta';

export const metadata = pageMeta('fr', '/tarifs/', pricingPage.fr.metaTitle, pricingPage.fr.metaDescription);

export default function Page() {
  return <PricingPage locale="fr" />;
}
