/** Quality tiers — costs and promises match packages/contracts/src/game/economy.ts. */
export const TIERS = [
  { id: 'QUICK', label: 'Quick', cost: 30, promise: 'Fast, concise turn', detail: 'Good for moving through a room.', art: false },
  { id: 'VIVID', label: 'Vivid', cost: 60, promise: 'Richer dialogue and direction', detail: 'The default. How most turns are played.', art: false },
  { id: 'CINEMATIC', label: 'Cinematic', cost: 90, promise: 'Best balance of immersion and speed', detail: 'Eligible for scene art.', art: true },
  { id: 'APEX', label: 'Apex', cost: 195, promise: 'Deepest reasoning and premium storytelling', detail: 'Longest memory, scene art.', art: true },
] as const;

export const FEATURES = [
  { icon: 'dice', tag: 'ENGINE', title: 'Deterministic outcomes', desc: 'You can’t talk the model into a win. Every check is a seeded roll against a real difficulty, committed before a word of prose is written.', stat: 'd20', statLabel: 'seeded' },
  { icon: 'heart', tag: 'SOCIAL', title: 'Relationships that can fail', desc: 'Five dimensions per character with dampening and hard gates. Treat someone badly and the story remembers.', stat: '5', statLabel: 'dimensions' },
  { icon: 'shield', tag: 'RULES', title: 'Real inventory, quests and death', desc: 'Items exist or they don’t. Quests have multiple routes and observed gates. In The Salt Road, running out of water is not a metaphor.', stat: '1', statLabel: 'lethal' },
  { icon: 'fork', tag: 'RUNS', title: 'Fork any moment', desc: 'Wonder what would have happened if you had told the truth? Fork the run from that turn. The original stays exactly where you left it.', stat: '60', statLabel: 'snapshots' },
  { icon: 'edit', tag: 'CANON', title: 'Rephrase and correct canon', desc: 'Didn’t mean it that way? Rephrase before the roll. Writer got a detail wrong? Correct the canon and the world updates.', stat: '∞', statLabel: 'retries' },
  { icon: 'image', tag: 'ART', title: 'Art for every scene', desc: 'Hand-directed covers, key art, stages and portraits for every world, plus hero frames on Cinematic and Apex turns.', stat: '70+', statLabel: 'stages' },
] as const;

export const FAQ = [
  { q: 'Is this just ChatGPT with an anime skin?', a: 'No. The language model only does two things: it reads what you typed into a structured intent, and it describes what the game engine already decided. It never chooses outcomes, moves the clock, invents travel, or gives lines to characters who aren’t in the room. If it tries, the validator rejects the turn.' },
  { q: 'Can I really type anything?', a: 'Yes. Say it, do it, whisper it, attack someone, refuse the quest, try to fly. The parser figures out what you meant and the engine figures out whether it works. Some things simply fail. That is the point.' },
  { q: 'Is it free?', a: 'You start with 900 credits and get a daily allowance after that. The default tier costs 60 credits per turn. If you want to play more, credit packs are available as one-time purchases. There is no subscription.' },
  { q: 'Does paying more make me stronger?', a: 'No. Tiers change how the turn is presented: word count, memory depth, scene art. Nothing else. The dice, difficulty and rules are identical whether you play Quick or Apex.' },
  { q: 'Can I die?', a: 'In The Salt Road, yes. The other nine launch worlds fail forward: you lose things, people, and standing, but the story continues. The world sheet tells you which kind you are in before you start.' },
  { q: 'What about my data?', a: 'Your sessions are yours. We store what you type and what the game generates so your run can continue, and our AI providers are contractually barred from training on it.', link: { href: '/privacy', label: 'Privacy Policy' } },
  { q: 'How old do I have to be?', a: 'Plotbreak is for players aged 13 and over. The stories contain fantasy violence, mature themes and relationships that go wrong.' },
] as const;
