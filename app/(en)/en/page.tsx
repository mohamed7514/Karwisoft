import { HomePage } from '../../../components/pages/HomePage';
import { pageMeta } from '../../../lib/i18n/meta';

export const metadata = pageMeta('en', '/', 'Karwisoft — Why would your next patient choose you?', 'A patient looks for a dentist and compares several clinics. Why would they choose yours? Websites, Google Ads and SEO for dental clinics.');

export default function Page() {
  return <HomePage locale="en" />;
}
