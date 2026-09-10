# Plotbreak site

Landing page plus the Privacy Policy and Terms of Service the App Store review
needs. Vite + React + TypeScript, plain CSS, no UI framework.

```
index.html                 Vite entry (meta tags, fonts)
src/config.ts              App name, domain, support email, App Store URL, policy date
src/App.tsx                Routes: /  /privacy  /terms
src/pages/Home.tsx         Landing page
src/pages/Privacy.tsx      Privacy Policy (content in PrivacyDoc.tsx)
src/pages/Terms.tsx        Terms of Service (content in TermsDoc.tsx)
src/components/            Nav, Footer, StoreButton, CoverStack (hero fan), PolicyLayout, Icons
src/data/worlds.ts         Launch catalog shown on the home page
src/data/content.ts        Tiers, feature rows, FAQ
src/styles/global.css      Tokens (black / grey / lime), buttons, chips, tags, cards
src/styles/home.css        Landing sections
src/styles/policy.css      Policy pages (mirrors ooc.ai/policy/*)
public/assets/             Icon, hero, ten world covers (six from the app repo, four generated with Dare)
scripts/postbuild.mjs      Copies index.html to /privacy/ and /terms/ for static hosts
```

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, builds to dist/, writes /privacy and /terms
npm run preview    # serves dist/
```

## Deploy

```bash
npx vercel --prod          # vercel.json handles SPA rewrites and asset caching
# or connect the repo to Netlify: netlify.toml builds and publishes dist/
```

Then in the app set `EXPO_PUBLIC_LEGAL_BASE_URL=https://plotbreak.com`.
The app opens `<base>/privacy` and `<base>/terms`.

## Before launch

| What | Where |
| --- | --- |
| App Store link | `src/config.ts` → `APP_STORE_URL`. Every App Store button picks it up. |
| Support email | `src/config.ts` → `SUPPORT_EMAIL` (also hard-coded in the two policy docs; search `hi@cielpm.ai`). |
| Legal entity | Both policies name "Plotbreak" as the operator. If you launch under an LLC/Inc, replace the first occurrence in each doc. |
| Governing law | `TermsDoc.tsx` §12 assumes Delaware, with an Ontario paragraph for residents of Canada. |
| Privacy officer | `PrivacyDoc.tsx` §14 lists your name and "Founder". |
| Policy date | `src/config.ts` → `POLICY_DATE`, plus the "Last Updated" line inside each doc. |
