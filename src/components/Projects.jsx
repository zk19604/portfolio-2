/* ===== PROJECTS — polaroids on a wire rack, click to flip ===== */
import { useState } from 'react'
import DATA from '../data'

function Polaroid({ p, i }) {
  const rot = [-5, 4, -3, 6][i % 4]
  const [flipped, setFlipped] = useState(false)
  const links = p.links || {}

  return (
    <div
      className={'pola' + (flipped ? ' is-flipped' : '')}
      style={{ '--rot': rot + 'deg' }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
    >
      <span className="pola__peg"></span>

      <div className="pola__inner">
        {/* FRONT */}
        <div className="pola__face pola__front">
          <div className="pola__photo" style={{ '--tint': p.tint }}>
            <div className="pola__ph">
              <span className="pola__phlabel">{p.sub}</span>
            </div>
            <span className="pola__stack">{p.stack}</span>
          </div>
          <div className="pola__caption">
            <span className="pola__name">{p.name}</span>
            <span className="pola__arrow">⟳</span>
          </div>
        </div>

        {/* BACK */}
        <div className="pola__face pola__back">
          <span className="pola__backname">{p.name}</span>
          <p className="pola__desc wrap-pretty">{p.desc}</p>
          <div className="pola__links">
            {links.code && (
              <a
                className="pola__link"
                href={links.code}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {'</> CODE'}
              </a>
            )}
            {links.live && (
              <a
                className="pola__link"
                href={links.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                ↗ LIVE
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const D = DATA
  return (
    <section className="projects section" data-screen-label="Projects" id="projects">
      <div className="sec-head">
        <span className="plate">PROJECTS</span>
        <span className="sec-head__file">// pinned to the rack · tap to flip</span>
      </div>

      <div className="rack">
        <div className="rack__row">
          {D.projects.map((p, i) => (
            <Polaroid key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
