import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { LocaleProvider, DICTS, stripLocale, preferredLocale, localePath, type Locale } from './i18n';

function Page({ locale, page }: { locale: Locale; page: 'home' | 'privacy' | 'terms' }) {
  const el = page === 'home' ? <Home /> : page === 'privacy' ? <Privacy /> : <Terms />;
  return <LocaleProvider locale={locale}>{el}</LocaleProvider>;
}

export default function App() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { locale, path } = stripLocale(pathname);

  // First visit at the English root: follow a saved choice or a French browser.
  useEffect(() => {
    if (pathname !== '/') return;
    const pref = preferredLocale();
    if (pref === 'fr') navigate('/fr' + hash, { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = DICTS[locale];
    const key = path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : 'home';
    document.title = t.titles[key];
    document.documentElement.lang = t.htmlLang;
    // hreflang alternates for search engines
    document.querySelectorAll('link[data-alt]').forEach((l) => l.remove());
    for (const l of ['en', 'fr'] as Locale[]) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = `https://plotbreak.com${localePath(l, path)}`;
      link.dataset.alt = '1';
      document.head.appendChild(link);
    }
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash, locale, path]);

  return (
    <Routes>
      <Route path="/" element={<Page locale="en" page="home" />} />
      <Route path="/privacy" element={<Page locale="en" page="privacy" />} />
      <Route path="/terms" element={<Page locale="en" page="terms" />} />
      <Route path="/fr" element={<Page locale="fr" page="home" />} />
      <Route path="/fr/privacy" element={<Page locale="fr" page="privacy" />} />
      <Route path="/fr/terms" element={<Page locale="fr" page="terms" />} />
      <Route path="/fr/*" element={<Page locale="fr" page="home" />} />
      <Route path="*" element={<Page locale="en" page="home" />} />
    </Routes>
  );
}
