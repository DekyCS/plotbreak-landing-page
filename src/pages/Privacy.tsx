import PolicyLayout from '../components/PolicyLayout';
import PrivacyDoc from './PrivacyDoc';
import PrivacyDocFr from './PrivacyDocFr';
import { useLocale } from '../i18n';

export default function Privacy() {
  const { t, locale } = useLocale();
  return (
    <PolicyLayout title={t.policy.privacyTitle}>
      {locale === 'fr' ? <PrivacyDocFr /> : <PrivacyDoc />}
    </PolicyLayout>
  );
}
