export interface World {
  id: string;
  title: string;
  hook: string;
  tags: string[];
  cover: string;
  coverLarge: string;
  defeat: 'Fail forward' | 'Lethal';
}

const cover = (id: string) => ({ cover: `/assets/covers/${id}-600.webp`, coverLarge: `/assets/covers/${id}.webp` });

/** The launch catalog. Titles, hooks and tags match LAUNCH_CATALOG in the app repo. */
export const WORLDS: World[] = [
  {
    id: 'ninth_archive',
    title: 'The Ninth Archive',
    hook: 'Your school record has been deleted. You are still standing at the gate, holding your acceptance letter.',
    tags: ['Magic academy', 'Mystery', 'Dark fantasy', 'Rivalry', 'Investigation'],
    defeat: 'Fail forward',
    ...cover('ninth_archive'),
  },
  {
    id: 'red_moon',
    title: 'Red Moon Brigade',
    hook: 'Your first real hunt killed your squad and should have killed you. Something in the Behemoth decided otherwise.',
    tags: ['Monsters', 'Military', 'Dark fantasy', 'Rivalry', 'Body horror'],
    defeat: 'Fail forward',
    ...cover('red_moon'),
  },
  {
    id: 'seven_days',
    title: 'Seven Days to Midnight',
    hook: 'You arrived on Monday for a fresh start. On Sunday at midnight the city is destroyed and you die. Then it is Monday again.',
    tags: ['Mystery', 'Time loop', 'Slice of life', 'Supernatural', 'Drama'],
    defeat: 'Fail forward',
    ...cover('seven_days'),
  },
  {
    id: 'tidewall',
    title: 'The Tidewall',
    hook: 'Your sister died holding a gate on the wall. One survivor says he watched her walk away from it afterwards.',
    tags: ['High fantasy', 'Class RPG', 'Military', 'Monsters', 'Rivalry'],
    defeat: 'Fail forward',
    ...cover('tidewall'),
  },
  {
    id: 'salt_road',
    title: 'The Salt Road',
    hook: 'You are paid to carry a locked case across the desert. You have nine days of water and eleven days of walking.',
    tags: ['Survival', 'Adventure', 'Mystery', 'Dark fantasy'],
    defeat: 'Lethal',
    ...cover('salt_road'),
  },
  {
    id: 'blackwake',
    title: 'Blackwake',
    hook: 'Your guardian spent forty years looking for a sea that is not on any map. Somebody killed him for it and left you the compass.',
    tags: ['Pirates', 'Adventure', 'Exploration', 'Crew', 'Mystery'],
    defeat: 'Fail forward',
    ...cover('blackwake'),
  },
  {
    id: 'unbound',
    title: 'The Unbound',
    hook: 'Your school was dissolved and its students parcelled out. You are the one nobody has decided what to do with yet.',
    tags: ['Martial arts', 'Anime', 'Mystery', 'Rivalry', 'Coming of age'],
    defeat: 'Fail forward',
    ...cover('unbound'),
  },
  {
    id: 'nine_weeks',
    title: 'Nine Weeks',
    hook: 'You came back to work the same summer season. So did the person who left without saying goodbye, and they did not come back alone.',
    tags: ['Romance', 'Slice of life', 'Summer', 'Drama', 'Coming of age'],
    defeat: 'Fail forward',
    ...cover('nine_weeks'),
  },
  {
    id: 'understudy',
    title: 'The Understudy',
    hook: 'You are the understudy for the lead. Opening night is in six weeks, and the director does not recast.',
    tags: ['Rivalry', 'Romance', 'Drama', 'Ambition'],
    defeat: 'Fail forward',
    ...cover('understudy'),
  },
  {
    id: 'last_five',
    title: 'Last Five',
    hook: 'Kosei’s entire starting five walked out last spring. The school shuts the program down in March unless what is left of it reaches Nationals.',
    tags: ['Sports', 'School', 'Rivalry', 'Team', 'Coming of age', 'Drama'],
    defeat: 'Fail forward',
    ...cover('last_five'),
  },
];

/** The five covers fanned in the hero, front to back. */
export const HERO_STACK = ['red_moon', 'seven_days', 'tidewall', 'blackwake', 'nine_weeks'];

/** Chip row. "Main" shows everything. */
export const GENRES = ['Main', 'Fantasy', 'Romance', 'Mystery', 'Monsters', 'Survival', 'Drama', 'Sports', 'Martial arts', 'Time loop', 'Pirates', 'Slice of life'];

export function matchesGenre(world: World, genre: string): boolean {
  if (genre === 'Main') return true;
  const g = genre.toLowerCase();
  return world.tags.some((t) => t.toLowerCase().includes(g));
}
