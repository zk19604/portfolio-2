/* ===== HERO ===== */
import DATA from '../data'
import GameBoy from './GameBoy'

export default function Hero() {
  const D = DATA
  return (
    <header className="hero section" data-screen-label="Hero" id="top">
      <div className="hero__grid">
        <div className="hero__left">
          <div className="hero__sys">
            <span className="hero__apple">❖</span>
            <span>Welcome.dsk</span>
            <span className="hero__sys-right">
              {D.location} · {new Date().getFullYear()}
            </span>
          </div>

          <p className="eyebrow">▸ booting personal_site.exe</p>
          <h1 className="hero__name">
            {D.name.split(' ').map((w, i) => (
              <span key={i}>{w}</span>
            ))}
            <span className="blink hero__caret">_</span>
          </h1>
          <p className="hero__role">{D.role}</p>
          <p className="hero__tag wrap-pretty">{D.tagline}</p>

          <div className="hero__chips">
            {D.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="chip">
                {l.label}
              </a>
            ))}
          </div>

         
        </div>

        <div className="hero__right">
          <div className="hero__gbwrap">
            <GameBoy />
            
          </div>
        </div>
      </div>
    </header>
  )
}
