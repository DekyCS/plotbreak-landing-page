import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, StoreButton } from '../components/Layout';
import CoverStack from '../components/CoverStack';
import { ArrowRight, Icon } from '../components/Icons';
import { WORLDS, GENRES, matchesGenre } from '../data/worlds';
import { TIERS, FEATURES, FAQ } from '../data/content';
import { APP_NAME } from '../config';

export default function Home() {
  const [genre, setGenre] = useState('Main');
  const [expanded, setExpanded] = useState(false);
  const shown = WORLDS.filter((w) => matchesGenre(w, genre));

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <img src="/assets/hero.webp" srcSet="/assets/hero-1000.webp 1000w, /assets/hero.webp 2000w" sizes="100vw" alt="" fetchPriority="high" />
          </div>
          <div className="wrap">
            <div className="hero-copy">
              <span className="star-line">The playable anime</span>
              <h1>Say anything.<br />The <span className="brand">dice</span> decide.</h1>
              <p className="lede">
                {APP_NAME} is a roleplay RPG where a real game engine rolls for every outcome. Charm, fight, lie, steal, run, then live with what actually happened. The AI only tells the story. It never gets to change it.
              </p>
              <div className="hero-cta">
                <StoreButton className="btn btn-brand btn-lg">
                  <span className="stack"><small>Download on the</small>App Store</span>
                </StoreButton>
                <a className="btn btn-dark btn-lg" href="#worlds">Explore Worlds</a>
              </div>
              <div className="hero-meta">
                <span className="tag tag-outline">10 worlds at launch</span>
                <span className="tag tag-outline">900 free credits</span>
                <span className="tag tag-brand">No pay-to-win dice</span>
              </div>
            </div>
            <CoverStack />
          </div>
        </section>

        {/* Stats */}
        <section className="wrap" aria-label="At a glance">
          <div className="stats reveal">
            <div><b><em>10</em> worlds</b><span>hand-built, each with its own rules</span></div>
            <div><b><em>d20</em> rolls</b><span>seeded, every single turn</span></div>
            <div><b><em>5</em> dimensions</b><span>per relationship, all of them can fail</span></div>
            <div><b><em>1</em> lethal world</b><span>where you can actually die</span></div>
          </div>
        </section>

        {/* Worlds */}
        <section className="section" id="worlds">
          <div className="wrap">
            <div className="chips" role="group" aria-label="Filter worlds by genre">
              {GENRES.map((g) => (
                <button key={g} type="button" className="chip" aria-pressed={genre === g} onClick={() => setGenre(g)}>{g}</button>
              ))}
            </div>
            <div className="section-head reveal">
              <div>
                <h2>Launch worlds</h2>
                <p>Every world is written by hand with its own cast, quest lines and one strong system. None of them are a chat window with a costume on.</p>
              </div>
              <button type="button" className="more" onClick={() => setExpanded((v) => !v)}>
                {expanded ? 'Show Covers' : 'Show Details'} <ArrowRight />
              </button>
            </div>
            {shown.length === 0 ? (
              <div className="empty">Nothing tagged “{genre}” yet.</div>
            ) : (
              <div className={`worlds${expanded ? ' expanded' : ''}`} key={genre + (expanded ? '-x' : '')}>
                {shown.map((w, i) => (
                  <a className="world" href="#download" key={w.id} style={{ animationDelay: `${i * 45}ms` }}>
                    <div className="cover">
                      <img src={w.cover} alt={`${w.title} cover art`} loading={i < 6 ? 'eager' : 'lazy'} decoding="async" />
                      {w.defeat === 'Lethal' && <span className="tag tag-danger lethal">Lethal</span>}
                    </div>
                    <div>
                      <h3>{w.title}</h3>
                      <div className="meta">{w.tags.slice(0, 2).join(' · ')} · {w.defeat}</div>
                      <p className="hook">{w.hook}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <hr className="rule" />

        {/* How a turn works */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="star-line">How a turn works</span>
                <h2 style={{ marginTop: 10 }}>The model interprets. The engine decides. The writer makes it hurt.</h2>
                <p>Most “AI RPGs” let the language model narrate itself into omnipotence. Type “she falls in love with me” and she does. {APP_NAME} never lets the model decide outcomes.</p>
              </div>
            </div>
            <div className="pipeline reveal">
              <div className="card step">
                <span className="n">01 · You type</span>
                <h3>Anything at all</h3>
                <p>No menus, no pre-written choices. The parser turns your sentence into a structured intent: who, what, how risky.</p>
                <div className="sample">
                  <span className="k">you →</span> “Slip the ledger into my bag while Marta is arguing with the stage manager.”<br />
                  <span className="k">intent</span> <span className="a">steal</span> <span className="k">· target</span> ledger <span className="k">· risk</span> <span className="w">RISKY</span>
                </div>
              </div>
              <div className="card step">
                <span className="n">02 · The engine rolls</span>
                <h3>A pure, seeded rules engine</h3>
                <p>Checks, inventory, quests, relationships, combat and death are engine truth. Same seed, same outcome, every time. Paying more never buys better dice.</p>
                <div className="sample">
                  <span className="k">check</span> Sleight · DC 14<br />
                  <span className="k">roll</span> 11 + 4 = 15 <span className="a">SUCCESS</span><br />
                  <span className="k">mutate</span> +ledger <span className="k">·</span> Marta suspicion +1
                </div>
              </div>
              <div className="card step">
                <span className="n">03 · The writer describes</span>
                <h3>Prose over truth, not instead of it</h3>
                <p>Only after the engine has committed does a writer describe what already happened. It can be beautiful. It cannot be wrong.</p>
                <div className="sample prose">The ledger is heavier than it looks. Marta is still talking about the lights when you close the bag, and she does not look over. But her sentence loses its shape for half a second, and you both hear it.</div>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* Why it's different — the activity-badge list */}
        <section className="section" id="why">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="star-line">Why it’s different</span>
                <h2 style={{ marginTop: 10 }}>A game that happens to be generative. Not a chatbot in a costume.</h2>
              </div>
            </div>
            <div className="rows reveal">
              {FEATURES.map((f) => (
                <div className="card row" key={f.title}>
                  <div className="ico"><Icon name={f.icon} /></div>
                  <div>
                    <div className="title">{f.title} <span className="tag tag-outline">{f.tag}</span></div>
                    <div className="desc">{f.desc}</div>
                  </div>
                  <div className="stat"><span className="box">✱</span>{f.stat}<span className="stat-label">{f.statLabel}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* Credits */}
        <section className="section" id="credits">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="star-line">Credits</span>
                <h2 style={{ marginTop: 10 }}>Pay for prose. Never for luck.</h2>
                <p>Every turn costs credits. A higher tier buys deeper writing, more memory and scene art. The engine underneath is identical at every tier, so nobody can buy a better roll.</p>
              </div>
            </div>
            <div className="tiers reveal">
              {TIERS.map((t) => (
                <div className={`card tier${t.id === 'VIVID' ? ' default' : ''}`} key={t.id}>
                  <div className="name">{t.label}{t.id === 'VIVID' && <span className="tag tag-brand">Default</span>}</div>
                  <div className="cost"><span className="box">✱</span>{t.cost}<small>credits / turn</small></div>
                  <p>{t.promise}.</p>
                  <span className="promise">{t.detail}</span>
                </div>
              ))}
            </div>
            <p className="tiers-note">New accounts start with 900 credits, then receive a daily allowance. Credit packs are one-time purchases through the App Store. No subscription, no auto-reload.</p>
          </div>
        </section>

        <hr className="rule" />

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="star-line">FAQ</span>
                <h2 style={{ marginTop: 10 }}>Questions people ask before they download.</h2>
              </div>
            </div>
            <div className="faq reveal">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="a">
                    {item.a}{' '}
                    {'link' in item && item.link ? <>Full details are in the <Link to={item.link.href}>{item.link.label}</Link>.</> : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="download">
          <div className="wrap">
            <img src="/assets/icon-512.png" alt={`${APP_NAME} app icon`} width={72} height={72} />
            <h2>Your move.</h2>
            <p>Free to start. Ten worlds. One rule: the dice are honest.</p>
            <div className="hero-cta">
              <StoreButton className="btn btn-brand btn-lg">
                <span className="stack"><small>Download on the</small>App Store</span>
              </StoreButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
