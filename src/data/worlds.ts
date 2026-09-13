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
  const base = `/assets/covers/v4/${id}${locale === 'fr' ? '.fr' : ''}`;
  return { cover: `${base}-600.webp`, coverLarge: `${base}.webp` };
}

/**
 * The catalog, in the app’s shelf order (LAUNCH_CATALOG in the main repo). `title` is the English name used as a
 * key and fallback; the displayed title, hook and tags live in the i18n
 * dictionaries under `worlds[id]`, matching the title drawn into each cover.
 */
export const WORLDS: WorldBase[] = [
  { id: 'ninth_archive', title: 'The Ninth Archive', defeat: 'Fail forward' },
  { id: 'understudy', title: 'The Understudy', defeat: 'Fail forward' },
  { id: 'salt_road', title: 'The Salt Road', defeat: 'Lethal' },
  { id: 'tidewall', title: 'The Tidewall', defeat: 'Fail forward' },
  { id: 'unbound', title: 'The Unbound', defeat: 'Fail forward' },
  { id: 'nine_weeks', title: 'Nine Weeks', defeat: 'Fail forward' },
  { id: 'red_moon', title: 'Red Moon Brigade', defeat: 'Fail forward' },
  { id: 'seven_days', title: 'Seven Days to Midnight', defeat: 'Fail forward' },
  { id: 'blackwake', title: 'Blackwake', defeat: 'Fail forward' },
  { id: 'last_five', title: 'Last Five', defeat: 'Fail forward' },
  { id: 'hush_house', title: 'Hush House', defeat: 'Fail forward' },
  { id: 'window_seven', title: 'Window Seven', defeat: 'Fail forward' },
  { id: 'good_morning_husband', title: 'Good Morning, Husband', defeat: 'Fail forward' },
  { id: 'itachi', title: 'Itachi', defeat: 'Fail forward' },
  { id: 'primal_crown', title: 'Primal Crown', defeat: 'Fail forward' },
  { id: 'zero_throne', title: 'Zero Throne', defeat: 'Fail forward' },
  { id: 'fourth_beast', title: 'The Fourth Beast', defeat: 'Fail forward' },
  { id: 'seven_names', title: 'Seven Names', defeat: 'Fail forward' },
  { id: 'blank_prophecy', title: 'The Blank Prophecy', defeat: 'Fail forward' },
  { id: 'red_floor', title: 'The Red Floor', defeat: 'Fail forward' },
  { id: 'second_skin', title: 'Second Skin', defeat: 'Fail forward' },
  { id: 'last_service', title: 'Last Service', defeat: 'Fail forward' },
  { id: 'pink_tide', title: 'Pink Tide', defeat: 'Fail forward' },
  { id: 'ace', title: 'Ace', defeat: 'Fail forward' },
  { id: 'light', title: 'Light', defeat: 'Fail forward' },
];

/** The five covers fanned in the hero, front to back. */
export const HERO_STACK = ['red_moon', 'light', 'seven_days', 'itachi', 'pink_tide'];

/** The first genre chip means "everything" in every locale. */
export function matchesGenre(tags: string[], genre: string, all: string): boolean {
  if (genre === all) return true;
  const g = genre.toLowerCase();
  return tags.some((t) => t.toLowerCase().includes(g));
}
