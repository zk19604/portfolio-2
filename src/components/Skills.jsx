/* ===== SKILLS — rotating banner + working gumball machine ===== */
import { useEffect, useMemo, useRef, useState } from 'react'
import DATA from '../data'

const GUM_COLORS = ['#e0594b', '#62c6e8', '#efa9c4', '#f2c021', '#7d9a4e', '#2f6fb0', '#df7bb0', '#6fb0dd']
const monogram = (s) => s.replace(/[^A-Za-z+#]/g, '').slice(0, 2)

function GumballMachine() {
  const skills = DATA.skills
  const colorOf = (s) => GUM_COLORS[skills.indexOf(s) % GUM_COLORS.length]

  const [collected, setCollected] = useState([])
  const [current, setCurrent] = useState(null)
  const [turning, setTurning] = useState(false)
  const [picked, setPicked] = useState(null)
  const [spin, setSpin] = useState(0)

  // ---- physics geometry (px, within the 210px glass globe) ----
  const G = 210 // globe size
  const C = G / 2 // centre
  const BR = 13 // ball radius
  const WALL = C - 4 - BR // max distance of a ball centre from globe centre

  // pack one named ball per skill into a "settled" hex pile (bottom rows
  // first) — this is only the *starting* layout; physics takes over after.
  const balls = useMemo(() => {
    const Rp = 40 // packing radius (% of globe)
    const D = 13.6 // ball diameter (%)
    const r = D / 2
    const rowH = D * 0.86
    const restY = 94
    const cells = []
    let row = 0
    for (let y = restY - r; y > 50 - Rp + r; y -= rowH) {
      const dy = y - 50
      const half = Math.sqrt(Math.max(0, Rp * Rp - dy * dy)) - r
      if (half <= 0) {
        row++
        continue
      }
      const offset = (row % 2) * (D / 2)
      const span = 2 * half - offset
      const n = Math.max(1, Math.floor(span / D) + 1)
      const start = 50 - ((n - 1) * D) / 2 + (offset ? offset / 2 : 0)
      for (let k = 0; k < n; k++) cells.push({ x: start + k * D, y, row })
      row++
    }
    return skills.map((s, i) => {
      const cell = cells[i % cells.length] || { x: 50, y: restY }
      const jx = Math.sin(i * 12.9898) * 1.4
      const jy = Math.cos(i * 4.337) * 1.1
      return {
        name: s,
        mono: monogram(s),
        c: GUM_COLORS[i % GUM_COLORS.length],
        x0: ((cell.x + jx) / 100) * G, // initial px centre
        y0: ((cell.y + jy) / 100) * G,
      }
    })
  }, [skills])

  // ---- physics engine: gravity + ball/ball + circular wall ----
  const ballEls = useRef([]) // DOM nodes
  const sim = useRef([]) // {x,y,vx,vy} per ball
  const agitateUntil = useRef(0) // shake the machine until this timestamp

  useEffect(() => {
    sim.current = balls.map((b) => ({ x: b.x0, y: b.y0, vx: 0, vy: 0 }))

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const paint = () => {
      const arr = sim.current
      for (let i = 0; i < arr.length; i++) {
        const el = ballEls.current[i]
        if (el) el.style.transform = `translate(${arr[i].x - BR}px, ${arr[i].y - BR}px)`
      }
    }

    if (reduce) {
      paint()
      return
    }

    let raf
    const step = () => {
      const arr = sim.current
      const now = performance.now()
      const shaking = now < agitateUntil.current
      const g = shaking ? 0.06 : 0.45 // gravity (px/frame²)

      // integrate
      for (const b of arr) {
        if (shaking) {
          b.vx += (Math.random() - 0.5) * 3.2
          b.vy += (Math.random() - 0.5) * 3.2
        }
        b.vy += g
        b.vx *= 0.992
        b.vy *= 0.992
        b.x += b.vx
        b.y += b.vy
      }

      // ball ↔ ball collisions
      const min = BR * 2
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const a = arr[i]
          const b = arr[j]
          let dx = b.x - a.x
          let dy = b.y - a.y
          let d = Math.hypot(dx, dy)
          if (d === 0) {
            dx = 0.01
            d = 0.01
          }
          if (d < min) {
            const nx = dx / d
            const ny = dy / d
            const overlap = (min - d) / 2
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap
            const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
            if (vn < 0) {
              const imp = -(1 + 0.42) * vn * 0.5
              a.vx -= imp * nx
              a.vy -= imp * ny
              b.vx += imp * nx
              b.vy += imp * ny
            }
          }
        }
      }

      // circular glass wall
      for (const b of arr) {
        const dx = b.x - C
        const dy = b.y - C
        const d = Math.hypot(dx, dy)
        if (d > WALL) {
          const nx = dx / d
          const ny = dy / d
          b.x = C + nx * WALL
          b.y = C + ny * WALL
          const vn = b.vx * nx + b.vy * ny
          if (vn > 0) {
            b.vx -= (1 + 0.5) * vn * nx
            b.vy -= (1 + 0.5) * vn * ny
          }
        }
      }

      paint()
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [balls])

  const pull = () => {
    if (turning) return
    let remaining = skills.filter((s) => !collected.includes(s))
    if (!remaining.length) {
      setCollected([])
      remaining = skills
    }
    const pick = remaining[(Math.random() * remaining.length) | 0]
    setPicked(pick)
    setCurrent(null)
    setTurning(true)
    setSpin((n) => n + 1)
    // shake the globe — balls tumble freely for the duration of the crank
    agitateUntil.current = performance.now() + 850
    for (const b of sim.current) {
      b.vx += (Math.random() - 0.5) * 9
      b.vy -= Math.random() * 7 + 2
    }
    setTimeout(() => {
      setCurrent(pick)
      setCollected((c) => (c.includes(pick) ? c : [...c, pick]))
      setTurning(false)
    }, 1150)
  }

  return (
    <div className="gum">
      <div className={'gum__machine' + (turning ? ' gum__machine--shake' : '')}>
        <div className="gum__globe">
          {balls.map((b, i) => (
            <span
              key={i}
              ref={(el) => (ballEls.current[i] = el)}
              className={'gum__ball' + (collected.includes(b.name) ? ' gum__ball--out' : '')}
              title={b.name}
              style={{
                width: 26,
                height: 26,
                background: b.c,
                transform: `translate(${b.x0 - BR}px, ${b.y0 - BR}px)`,
              }}
            >
              {b.mono}
            </span>
          ))}

          {/* glass highlight sweep */}
          <span className="gum__shine" />
        </div>

        {/* the ball that actually drops out — travels the chute into the tray */}
        {turning && (
          <span key={spin} className="gum__fall gum__fall--go" style={{ background: colorOf(picked) }}>
            {monogram(picked)}
          </span>
        )}

        <div className="gum__neck">
          <div className="gum__chute" />
          <button
            className={'gum__crank' + (turning ? ' gum__crank--turn' : '')}
            onClick={pull}
            aria-label="turn the crank"
          >
            <span className="gum__crankarm"></span>
          </button>
          <div className="gum__slot">25¢ · SKILL</div>
        </div>

        <div className="gum__base">
          <div className="gum__tray">
            {current ? (
              <>
                <span className="gum__trayball" style={{ background: colorOf(current) }} />
                <span key={current} className="gum__got">
                  {current}
                </span>
              </>
            ) : (
              <span className="gum__empty">{turning ? '···' : 'turn me →'}</span>
            )}
          </div>
        </div>
        <div className="gum__legs">
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="gum__collected">
        <div className="gum__collhead">
          COLLECTED {collected.length}/{skills.length}
        </div>
        <div className="gum__chips">
          {collected.map((s) => (
            <span key={s} className="gum__chip" style={{ background: colorOf(s) }}>
              {s}
            </span>
          ))}
          {!collected.length && <span className="gum__hint">turn the crank to dispense your first skill ↑</span>}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const skills = DATA.skills
  return (
    <section className="skills section" data-screen-label="Skills" id="skills">
      <div className="skills__title">
        <span className="plate plate--big">GET MY SKILL</span>
        <span className="skills__sub">one quarter, one skill. machine never runs out.</span>
      </div>

      {/* rotating line of skills */}
      <div className="smarquee" aria-hidden="true">
        <div className="smarquee__track">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="smarquee__item">
              <span className="smarquee__dot" style={{ background: GUM_COLORS[i % GUM_COLORS.length] }} />
              {s}
              <span className="smarquee__star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <GumballMachine />
    </section>
  )
}
