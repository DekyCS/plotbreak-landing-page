import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { POLICY_DATE } from '../config';
import { ArrowLeft, Chevron } from './Icons';

/** The ooc-style policy frame: title, version dropdown, 768px markdown column. */
export default function PolicyLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const el = details.current;
      if (el && !el.contains(e.target as Node)) el.removeAttribute('open');
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <main className="policy">
      <h1>{title}</h1>
      <div className="policy-toolbar">
        <details className="version" ref={details}>
          <summary><span>{POLICY_DATE}</span><Chevron /></summary>
          <div><button type="button" onClick={() => details.current?.removeAttribute('open')}>{POLICY_DATE}</button></div>
        </details>
        <Link to="/" className="policy-back"><ArrowLeft />Back to Plotbreak</Link>
      </div>
      <section className="doc">{children}</section>
    </main>
  );
}
