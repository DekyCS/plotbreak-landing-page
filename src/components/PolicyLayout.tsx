import { Link } from 'react-router-dom';
import { ArrowLeft } from './Icons';
import { useLocale } from '../i18n';
import { LanguageSwitch } from './Layout';

/** The ooc-style policy frame: title, toolbar, 768px markdown column. */
export default function PolicyLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const { t, path } = useLocale();
  return (
    <main className="policy">
      <h1>{title}</h1>
      <div className="policy-toolbar">
        <LanguageSwitch className="policy-back" />
        <Link to={path('/')} className="policy-back"><ArrowLeft />{t.policy.back}</Link>
      </div>
      <section className="doc">{children}</section>
    </main>
  );
}
