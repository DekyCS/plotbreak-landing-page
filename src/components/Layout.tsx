import { Link, useLocation } from 'react-router-dom';
import { APP_NAME, APP_STORE_URL, SUPPORT_EMAIL } from '../config';
import { AppleLogo } from './Icons';
import { useLocale, rememberLocale, stripLocale } from '../i18n';

export function Wordmark() {
  const { t, path } = useLocale();
  return (
    <Link to={path('/')} className="wordmark" aria-label={t.nav.home}>
      <span className="star">✱</span>{APP_NAME}
    </Link>
  );
}

/** Every "get the app" button goes through here so the store link is set once. */
export function StoreButton({ className = 'btn btn-white', children }: { className?: string; children?: React.ReactNode }) {
  const { t, path } = useLocale();
  const href = APP_STORE_URL || `${path('/')}#download`;
  const external = Boolean(APP_STORE_URL);
  return (
    <a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
      <AppleLogo />
      {children ?? t.nav.store}
    </a>
  );
}

/** FR / EN toggle that keeps you on the same page. */
export function LanguageSwitch({ className = 'lang' }: { className?: string }) {
  const { t, otherLocale, otherLocalePath } = useLocale();
  const { pathname } = useLocation();
  const { path } = stripLocale(pathname);
  return (
    <Link to={otherLocalePath(path)} className={className} lang={otherLocale} title={t.switchTitle} onClick={() => rememberLocale(otherLocale)}>
      {t.switchLabel}
    </Link>
  );
}

export function Nav() {
  const { t, path } = useLocale();
  const home = path('/');
  return (
    <header className="nav">
      <div className="wrap">
        <Wordmark />
        <nav className="nav-links" aria-label="Sections">
          <a href={`${home}#worlds`}>{t.nav.worlds}</a>
          <a href={`${home}#how`}>{t.nav.how}</a>
          <a href={`${home}#why`}>{t.nav.why}</a>
          <a href={`${home}#credits`}>{t.nav.credits}</a>
          <a href={`${home}#faq`}>{t.nav.faq}</a>
        </nav>
        <div className="nav-actions">
          <LanguageSwitch />
          <StoreButton />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { t, path } = useLocale();
  const home = path('/');
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Wordmark />
          <p className="blurb">{t.footer.blurb}</p>
        </div>
        <div>
          <h4>{t.footer.explore}</h4>
          <ul>
            <li><a href={`${home}#worlds`}>{t.nav.worlds}</a></li>
            <li><a href={`${home}#how`}>{t.nav.how}</a></li>
            <li><a href={`${home}#credits`}>{t.nav.credits}</a></li>
            <li><a href={`${home}#download`}>{t.footer.download}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.support}</h4>
          <ul>
            <li><a href={`mailto:${SUPPORT_EMAIL}`}>{t.footer.contact}</a></li>
            <li><Link to={path('/terms')}>{t.footer.terms}</Link></li>
            <li><Link to={path('/privacy')}>{t.footer.privacy}</Link></li>
            <li><LanguageSwitch className="lang-inline" /></li>
          </ul>
        </div>
        <div className="copy">{t.footer.copy}</div>
      </div>
    </footer>
  );
}
