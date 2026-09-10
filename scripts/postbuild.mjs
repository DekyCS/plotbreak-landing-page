// Copy the built index.html into /privacy/ and /terms/ so any static host serves
// those routes directly (the app opens <base>/privacy and <base>/terms).
import { mkdirSync, copyFileSync } from 'node:fs';
for (const route of ['privacy', 'terms']) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
console.log('postbuild: wrote /privacy/index.html and /terms/index.html');
