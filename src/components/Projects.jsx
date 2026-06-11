/* ===== PROJECTS — polaroids on a wire rack ===== */
import DATA from '../data'

function Polaroid({ p, i }) {
  const rot = [-5, 4, -3, 6][i % 4]
  return (
    <a className="pola" href={p.href} target="_blank" rel="noreferrer" style={{ '--rot': rot + 'deg' }}>
      <span className="pola__peg"></span>
      <div className="pola__photo" style={{ '--tint': p.tint }}>
        <div className="pola__ph">
          <span className="pola__phlabel">{p.sub}</span>
        </div>
        <span className="pola__stack">{p.stack}</span>
      </div>
      <div className="pola__caption">
        <span className="pola__name">{p.name}</span>
        <span className="pola__arrow">↗</span>
      </div>
      <div className="pola__hover wrap-pretty">{p.desc}</div>
    </a>
  )
}

export default function Projects() {
  const D = DATA
  return (
    <section className="projects section" data-screen-label="Projects" id="projects">
      <div className="sec-head">
        <span className="plate">PROJECTS</span>
        <span className="sec-head__file">// pinned to the rack</span>
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
