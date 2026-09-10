export interface WorldBase {
  id: string;
  title: string;
  cover: string;
  coverLarge: string;
  defeat: 'Fail forward' | 'Lethal';
}

const cover = (id: string) => ({ cover: `/assets/covers/${id}-600.webp`, coverLarge: `/assets/covers/${id}.webp` });

/**
 * The launch catalog, in catalog order. Titles are names and stay in English in
 * every locale; hooks and tags live in the i18n dictionaries under `worlds[id]`.
 */
export const WORLDS: WorldBase[] = [
  { id: 'ninth_archive', title: 'The Ninth Archive', defeat: 'Fail forward', ...cover('ninth_archive') },
  { id: 'red_moon', title: 'Red Moon Brigade', defeat: 'Fail forward', ...cover('red_moon') },
  { id: 'seven_days', title: 'Seven Days to Midnight', defeat: 'Fail forward', ...cover('seven_days') },
  { id: 'tidewall', title: 'The Tidewall', defeat: 'Fail forward', ...cover('tidewall') },
  { id: 'salt_road', title: 'The Salt Road', defeat: 'Lethal', ...cover('salt_road') },
  { id: 'blackwake', title: 'Blackwake', defeat: 'Fail forward', ...cover('blackwake') },
  { id: 'unbound', title: 'The Unbound', defeat: 'Fail forward', ...cover('unbound') },
  { id: 'nine_weeks', title: 'Nine Weeks', defeat: 'Fail forward', ...cover('nine_weeks') },
  { id: 'understudy', title: 'The Understudy', defeat: 'Fail forward', ...cover('understudy') },
  { id: 'last_five', title: 'Last Five', defeat: 'Fail forward', ...cover('last_five') },
];

/** The five covers fanned in the hero, front to back. */
export const HERO_STACK = ['red_moon', 'seven_days', 'tidewall', 'blackwake', 'nine_weeks'];

/** The first genre chip means "everything" in every locale. */
export function matchesGenre(tags: string[], genre: string, all: string): boolean {
  if (genre === all) return true;
  const g = genre.toLowerCase();
  return tags.some((t) => t.toLowerCase().includes(g));
}
