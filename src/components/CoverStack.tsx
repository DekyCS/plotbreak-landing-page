import { useEffect, useRef, useState } from 'react';
import { WORLDS, HERO_STACK } from '../data/worlds';
import { ArrowLeft, ArrowRight } from './Icons';

const DEAL_MS = 3800;

/**
 * The hero's one orchestrated moment: five covers fanned like a hand of cards.
 * Every few seconds the front card is dealt to the back until the person takes
 * over with the arrows. Hover or focus pauses it, pointer position tilts the hand
 * a few degrees, and none of it runs under prefers-reduced-motion.
 */
export default function CoverStack() {
  const stack = HERO_STACK.map((id) => WORLDS.find((w) => w.id === id)!).filter(Boolean);
  const [order, setOrder] = useState(() => stack.map((w) => w.id));
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    const onChange = () => { reduced.current = mq.matches; };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || manual) return;
    const t = window.setInterval(() => {
      if (reduced.current || document.hidden) return;
      setOrder((o) => [...o.slice(1), o[0]]);
    }, DEAL_MS);
    return () => window.clearInterval(t);
  }, [paused, manual]);

  const deal = (dir: 1 | -1) => {
    setManual(true);
    setOrder((o) => (dir === 1 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced.current || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  };

  const front = stack.find((w) => w.id === order[0])!;

  return (
    <div
      className="fan-wrap"
      onPointerMove={onMove}
      onPointerLeave={() => { setTilt({ x: 0, y: 0 }); setPaused(false); }}
      onPointerEnter={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="fan" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} role="group" aria-label="Featured worlds">
        {stack.map((w) => {
          const i = order.indexOf(w.id); // 0 = front
          return (
            <a
              key={w.id}
              href="#worlds"
              className="fan-card"
              data-pos={i}
              style={{ zIndex: stack.length - i, animationDelay: `${i * 90}ms` }}
              aria-label={`${w.title}: ${w.hook}`}
              tabIndex={i === 0 ? 0 : -1}
            >
              <img src={w.cover} srcSet={`${w.cover} 600w, ${w.coverLarge} 900w`} sizes="280px" alt="" loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
              <span className="fan-tag"><span className="star">✱</span>Original</span>
              <span className="fan-title">
                <b>{w.title}</b>
                <small>{w.tags.slice(0, 2).join(' · ')}</small>
              </span>
            </a>
          );
        })}
      </div>
      <div className="fan-caption">
        <div className="fan-controls">
          <button type="button" className="fan-btn" onClick={() => deal(-1)} aria-label="Previous world"><ArrowLeft /></button>
          <span className="star-line">{front.title}</span>
          <button type="button" className="fan-btn" onClick={() => deal(1)} aria-label="Next world"><ArrowRight /></button>
        </div>
        <p key={front.id}>{front.hook}</p>
      </div>
    </div>
  );
}
