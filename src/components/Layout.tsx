import { Link, useLocation } from 'react-router-dom';
import { APP_NAME, APP_STORE_URL, DISCORD_URL, SUPPORT_EMAIL } from '../config';
import { AppleLogo, DiscordLogo } from './Icons';
import { useLocale, rememberLocale, stripLocale } from '../i18n';

/** The brand lockup. `full` adds the tagline row (localised); the default is the compact bar + PLOTBREAK. */
export function Wordmark({ full = false }: { full?: boolean }) {
  const { t, path, locale } = useLocale();
  const src = full ? `/assets/logo-${locale}.png` : '/assets/logo-compact.png';
  return (
    <Link to={path('/')} className={full ? 'wordmark wordmark-full' : 'wordmark'} aria-label={t.nav.home}>
      <img src={src} alt={APP_NAME} decoding="async" />
    </Link>
  );
}

/** Every "get the app" button goes through here so the store link is set once. */
export function StoreButton({ className = 'btn btn-white', children }: { className?: string; children?: React.ReactNode }) {
  const { t, locale } = useLocale();
  return (
    <a className={className} href={APP_STORE_URL[locale]} target="_blank" rel="noopener">
      <AppleLogo />
      {children ?? t.nav.store}
    </a>
  );
}

/** Every link to the Discord server goes through here, like `StoreButton` for the App Store. */
export function DiscordButton({ className = 'btn btn-discord', children }: { className?: string; children?: React.ReactNode }) {
  const { t } = useLocale();
  return (
    <a className={className} href={DISCORD_URL} target="_blank" rel="noopener" aria-label={children ? undefined : t.community.navLabel} title={t.community.navLabel}>
      <DiscordLogo />
      {children}
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
          <DiscordButton className="btn btn-dark btn-icon" />
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
          <Wordmark full />
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
            <li><a href={DISCORD_URL} target="_blank" rel="noopener">{t.footer.discord}</a></li>
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
