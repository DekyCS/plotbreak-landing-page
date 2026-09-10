import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, StoreButton } from '../components/Layout';
import CoverStack from '../components/CoverStack';
import { ArrowRight, Icon } from '../components/Icons';
import { WORLDS, matchesGenre } from '../data/worlds';
import { useLocale } from '../i18n';

export default function Home() {
  const { t, path } = useLocale();
  const all = t.genres[0];
  const [genre, setGenre] = useState(all);
  const [expanded, setExpanded] = useState(false);
  const shown = WORLDS.filter((w) => matchesGenre(t.worlds[w.id].tags, genre, all));
  const [s1, s2, s3] = t.how.steps;

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
              <span className="star-line">{t.hero.eyebrow}</span>
              <h1>{t.hero.h1a}<br />{t.hero.h1b} <span className="brand">{t.hero.h1brand}</span> {t.hero.h1c}</h1>
              <p className="lede">{t.hero.lede}</p>
              <div className="hero-cta">
                <StoreButton className="btn btn-brand btn-lg">
                  <span className="stack"><small>{t.hero.downloadOn}</small>{t.hero.appStore}</span>
                </StoreButton>
                <a className="btn btn-dark btn-lg" href="#worlds">{t.hero.explore}</a>
              </div>
              <div className="hero-meta">
                <span className="tag tag-outline">{t.hero.meta1}</span>
                <span className="tag tag-outline">{t.hero.meta2}</span>
                <span className="tag tag-brand">{t.hero.meta3}</span>
              </div>
            </div>
            <CoverStack />
          </div>
        </section>

        {/* Stats */}
        <section className="wrap" aria-label="At a glance">
          <div className="stats reveal">
            {t.stats.map((s) => (
              <div key={s.rest}><b><em>{s.big}</em> {s.rest}</b><span>{s.sub}</span></div>
            ))}
          </div>
        </section>

        {/* Worlds */}
        <section className="section" id="worlds">
          <div className="wrap">
            <div className="chips" role="group" aria-label={t.worldsSection.filterLabel}>
              {t.genres.map((g) => (
                <button key={g} type="button" className="chip" aria-pressed={genre === g} onClick={() => setGenre(g)}>{g}</button>
              ))}
            </div>
            <div className="section-head reveal">
              <div>
                <h2>{t.worldsSection.title}</h2>
                <p>{t.worldsSection.lede}</p>
              </div>
              <button type="button" className="more" onClick={() => setExpanded((v) => !v)}>
                {expanded ? t.worldsSection.showCovers : t.worldsSection.showDetails} <ArrowRight />
              </button>
            </div>
            {shown.length === 0 ? (
              <div className="empty">{t.worldsSection.empty(genre)}</div>
            ) : (
              <div className={`worlds${expanded ? ' expanded' : ''}`} key={genre + (expanded ? '-x' : '')}>
                {shown.map((w, i) => {
                  const c = t.worlds[w.id];
                  const defeat = w.defeat === 'Lethal' ? t.worldsSection.lethal : t.worldsSection.failForward;
                  return (
                    <a className="world" href="#download" key={w.id} style={{ animationDelay: `${i * 45}ms` }}>
                      <div className="cover">
                        <img src={w.cover} alt={t.worldsSection.coverAlt(w.title)} loading={i < 6 ? 'eager' : 'lazy'} decoding="async" />
                        {w.defeat === 'Lethal' && <span className="tag tag-danger lethal">{t.worldsSection.lethal}</span>}
                      </div>
                      <div>
                        <h3>{w.title}</h3>
                        <div className="meta">{c.tags.slice(0, 2).join(' · ')} · {defeat}</div>
                        <p className="hook">{c.hook}</p>
                      </div>
                    </a>
                  );
                })}
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
                <span className="star-line">{t.how.eyebrow}</span>
                <h2 style={{ marginTop: 10 }}>{t.how.title}</h2>
                <p>{t.how.lede}</p>
              </div>
            </div>
            <div className="pipeline reveal">
              <div className="card step">
                <span className="n">{s1.n}</span>
                <h3>{s1.h}</h3>
                <p>{s1.p}</p>
                <div className="sample">
                  <span className="k">{t.how.sample1.you}</span> {t.how.sample1.line}<br />
                  <span className="k">{t.how.sample1.intent}</span> <span className="a">{t.how.sample1.intentV}</span> <span className="k">{t.how.sample1.target}</span> {t.how.sample1.targetV} <span className="k">{t.how.sample1.risk}</span> <span className="w">{t.how.sample1.riskV}</span>
                </div>
              </div>
              <div className="card step">
                <span className="n">{s2.n}</span>
                <h3>{s2.h}</h3>
                <p>{s2.p}</p>
                <div className="sample">
                  <span className="k">{t.how.sample2.check}</span> {t.how.sample2.checkV}<br />
                  <span className="k">{t.how.sample2.roll}</span> {t.how.sample2.rollV} <span className="a">{t.how.sample2.result}</span><br />
                  <span className="k">{t.how.sample2.mutate}</span> {t.how.sample2.mutateV} <span className="k">·</span> {t.how.sample2.mutate2}
                </div>
              </div>
              <div className="card step">
                <span className="n">{s3.n}</span>
                <h3>{s3.h}</h3>
                <p>{s3.p}</p>
                <div className="sample prose">{t.how.sample3}</div>
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
                <span className="star-line">{t.why.eyebrow}</span>
                <h2 style={{ marginTop: 10 }}>{t.why.title}</h2>
              </div>
            </div>
            <div className="rows reveal">
              {t.why.features.map((f) => (
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
                <span className="star-line">{t.credits.eyebrow}</span>
                <h2 style={{ marginTop: 10 }}>{t.credits.title}</h2>
                <p>{t.credits.lede}</p>
              </div>
            </div>
            <div className="tiers reveal">
              {t.credits.tiers.map((tier) => (
                <div className={`card tier${tier.id === 'VIVID' ? ' default' : ''}`} key={tier.id}>
                  <div className="name">{tier.label}{tier.id === 'VIVID' && <span className="tag tag-brand">{t.credits.default}</span>}</div>
                  <div className="cost"><span className="box">✱</span>{tier.cost}<small>{t.credits.perTurn}</small></div>
                  <p>{tier.promise}.</p>
                  <span className="promise">{tier.detail}</span>
                </div>
              ))}
            </div>
            <p className="tiers-note">{t.credits.note}</p>
          </div>
        </section>

        <hr className="rule" />

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <span className="star-line">{t.faq.eyebrow}</span>
                <h2 style={{ marginTop: 10 }}>{t.faq.title}</h2>
              </div>
            </div>
            <div className="faq reveal">
              {t.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="a">
                    {item.a}{' '}
                    {'link' in item && item.link ? <>{t.faq.linkPrefix} <Link to={path('/privacy')}>{t.faq.linkLabel}</Link>.</> : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="download">
          <div className="wrap">
            <img src="/assets/icon-512.png" alt={t.cta.iconAlt} width={72} height={72} />
            <h2>{t.cta.title}</h2>
            <p>{t.cta.lede}</p>
            <div className="hero-cta">
              <StoreButton className="btn btn-brand btn-lg">
                <span className="stack"><small>{t.hero.downloadOn}</small>{t.hero.appStore}</span>
              </StoreButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
