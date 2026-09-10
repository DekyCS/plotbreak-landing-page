import { createContext, useContext } from 'react';
import en from './en';
import fr from './fr';

export type Locale = 'en' | 'fr';
export type Dict = typeof en;

export const DICTS: Record<Locale, Dict> = { en, fr };
export const STORAGE_KEY = 'plotbreak-locale';

/** `/privacy` → `/fr/privacy`; `/` → `/fr`. English paths are unprefixed. */
export function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return path === '/' ? '/fr' : `/fr${path}`;
}

/** Strip a locale prefix: `/fr/terms` → `/terms`. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const rest = pathname.slice(3);
    return { locale: 'fr', path: rest === '' ? '/' : rest };
  }
  return { locale: 'en', path: pathname };
}

interface LocaleValue {
  locale: Locale;
  t: Dict;
  /** Prefix a site path for the current locale. */
  path: (p: string) => string;
  /** The same page in the other language. */
  otherLocalePath: (currentPath: string) => string;
  otherLocale: Locale;
}

const Ctx = createContext<LocaleValue>({
  locale: 'en',
  t: en,
  path: (p) => p,
  otherLocalePath: (p) => localePath('fr', p),
  otherLocale: 'fr',
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const otherLocale: Locale = locale === 'en' ? 'fr' : 'en';
  const value: LocaleValue = {
    locale,
    t: DICTS[locale],
    path: (p) => localePath(locale, p),
    otherLocalePath: (p) => localePath(otherLocale, p),
    otherLocale,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);

export function rememberLocale(locale: Locale) {
  try { localStorage.setItem(STORAGE_KEY, locale); } catch { /* private mode */ }
}

export function preferredLocale(): Locale | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
  } catch { /* private mode */ }
  const lang = (navigator.language || '').toLowerCase();
  return lang.startsWith('fr') ? 'fr' : null;
}
