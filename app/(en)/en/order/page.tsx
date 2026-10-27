import { OrderPage } from '../../../../components/pages/OrderPage';
import { orderPage } from '../../../../lib/i18n/dict-order';
import { pageMeta } from '../../../../lib/i18n/meta';

export const metadata = pageMeta('en', '/commande/', orderPage.en.metaTitle, orderPage.en.metaDescription);

export default function Page() {
  return <OrderPage locale="en" />;
}
