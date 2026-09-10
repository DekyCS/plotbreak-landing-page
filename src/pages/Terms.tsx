import PolicyLayout from '../components/PolicyLayout';
import TermsDoc from './TermsDoc';
import TermsDocFr from './TermsDocFr';
import { useLocale } from '../i18n';

export default function Terms() {
  const { t, locale } = useLocale();
  return (
    <PolicyLayout title={t.policy.termsTitle}>
      {locale === 'fr' ? <TermsDocFr /> : <TermsDoc />}
    </PolicyLayout>
  );
}
