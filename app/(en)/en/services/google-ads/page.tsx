import { ServiceDetail } from '../../../../../components/ServiceDetail';
import { servicePage } from '../../../../../lib/service-pages';
import { pageMeta } from '../../../../../lib/i18n/meta';

const page = servicePage('google-ads', 'en')!;

export const metadata = pageMeta('en', '/services/google-ads/', page.metaTitle, page.description);

export default function Page() {
  return <ServiceDetail page={page} locale="en" />;
}
