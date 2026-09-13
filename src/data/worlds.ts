import type { Locale } from '../i18n';

export interface WorldBase {
  id: string;
  title: string;
  defeat: 'Fail forward' | 'Lethal';
}

/**
 * Cover art has the title drawn in, so each locale gets its own render:
 * `<id>.webp` (900w) and `<id>-600.webp` for English, `<id>.fr.webp` and
 * `<id>.fr-600.webp` for French. Same files the app ships.
 */
export function coverSrc(id: string, locale: Locale): { cover: string; coverLarge: string } {
  const base = `/assets/covers/${id}${locale === 'fr' ? '.fr' : ''}`;
  return { cover: `${base}-600.webp`, coverLarge: `${base}.webp` };
}

/**
 * The launch catalog, in catalog order. `title` is the English name used as a
 * key and fallback; the displayed title, hook and tags live in the i18n
 * dictionaries under `worlds[id]`, matching the title drawn into each cover.
 */
export const WORLDS: WorldBase[] = [
  { id: 'ninth_archive', title: 'The Ninth Archive', defeat: 'Fail forward' },
  { id: 'red_moon', title: 'Red Moon Brigade', defeat: 'Fail forward' },
  { id: 'seven_days', title: 'Seven Days to Midnight', defeat: 'Fail forward' },
  { id: 'tidewall', title: 'The Tidewall', defeat: 'Fail forward' },
  { id: 'salt_road', title: 'The Salt Road', defeat: 'Lethal' },
  { id: 'blackwake', title: 'Blackwake', defeat: 'Fail forward' },
  { id: 'unbound', title: 'The Unbound', defeat: 'Fail forward' },
  { id: 'nine_weeks', title: 'Nine Weeks', defeat: 'Fail forward' },
  { id: 'understudy', title: 'The Understudy', defeat: 'Fail forward' },
  { id: 'last_five', title: 'Last Five', defeat: 'Fail forward' },
];

/** The five covers fanned in the hero, front to back. */
export const HERO_STACK = ['red_moon', 'seven_days', 'tidewall', 'blackwake', 'nine_weeks'];

/** The first genre chip means "everything" in every locale. */
export function matchesGenre(tags: string[], genre: string, all: string): boolean {
  if (genre === all) return true;
  const g = genre.toLowerCase();
  return tags.some((t) => t.toLowerCase().includes(g));
}
