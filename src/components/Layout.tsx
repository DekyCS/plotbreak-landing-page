import { Link } from 'react-router-dom';
import { APP_NAME, APP_STORE_URL, SUPPORT_EMAIL } from '../config';
import { AppleLogo } from './Icons';

export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label={`${APP_NAME} home`}>
      <span className="star">✱</span>{APP_NAME}
    </Link>
  );
}

/** Every "get the app" button goes through here so the store link is set once. */
export function StoreButton({ className = 'btn btn-white', children }: { className?: string; children?: React.ReactNode }) {
  const href = APP_STORE_URL || '/#download';
  const external = Boolean(APP_STORE_URL);
  return (
    <a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
      <AppleLogo />
      {children ?? 'App Store'}
    </a>
  );
}

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Wordmark />
        <nav className="nav-links" aria-label="Sections">
          <a href="/#worlds">Worlds</a>
          <a href="/#how">How a turn works</a>
          <a href="/#why">Why it’s different</a>
          <a href="/#credits">Credits</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <StoreButton />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <Wordmark />
          <p className="blurb">The playable anime. A roleplay RPG where a real game engine rolls for every outcome and the AI only tells the story.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="/#worlds">Worlds</a></li>
            <li><a href="/#how">How a turn works</a></li>
            <li><a href="/#credits">Credits</a></li>
            <li><a href="/#download">Download</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href={`mailto:${SUPPORT_EMAIL}`}>Contact &amp; Support</a></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="copy">© 2026 {APP_NAME}. All rights reserved.</div>
      </div>
    </footer>
  );
}
