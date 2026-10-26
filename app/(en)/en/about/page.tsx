import { AboutPage } from '../../../../components/pages/AboutPage';
import { aboutPage } from '../../../../lib/i18n/dict-company';
import { pageMeta } from '../../../../lib/i18n/meta';

export const metadata = pageMeta('en', '/a-propos/', aboutPage.en.metaTitle, aboutPage.en.metaDescription);

export default function Page() {
  return <AboutPage locale="en" />;
}
