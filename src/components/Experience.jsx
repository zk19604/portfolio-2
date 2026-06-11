/* ===== EXPERIENCE — manila folders stacked like a real drawer =====
   Oldest sits at the back; the newest role is the front folder. Click a
   folder and its papers slide out below the tab — the tab never hides. */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DATA from '../data'

const DARK = ['#2c2c2c', '#221f1a', '#2a261f']

function Folder({ e, tabIndex, open, onToggle }) {
  const year = (e.dates.match(/\d{4}/) || [''])[0]
  const dark = DARK.includes(String(e.color).toLowerCase())
  return (
    <div
      className={'efolder' + (open ? ' efolder--open' : '')}
      style={{ '--fc': e.color, '--tabx': 16 + tabIndex * 46 + 'px', '--zi': tabIndex + 1, '--tink': dark ? '#f6efde' : 'var(--ink)' }}
    >
      <button className="efolder__tab" onClick={onToggle}>
        {year || e.org}
      </button>

      <div className="efolder__body" onClick={onToggle}>
        <div className="efolder__title">{e.org}</div>
        <div className="efolder__role">{e.role}</div>
        <div className="efolder__meta">
          <span className="efolder__dates">{e.dates}</span>
          <span className="efolder__hint">{open ? '▾ click to close' : '▸ click to open'}</span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="efolder__sheet"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="efolder__list">
              {e.bullets.map((b, j) => (
                <li key={j} className="wrap-pretty">
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Experience() {
  const D = DATA
  // all folders start closed — open is a Set so any number can be expanded at once.
  const [open, setOpen] = useState(() => new Set())
  const toggle = (org) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(org) ? next.delete(org) : next.add(org)
      return next
    })
  // render oldest → newest so the newest paints last (front of the stack)
  const stack = [...D.experience]

  return (
    <section className="experience section" data-screen-label="Experience" id="experience">
      <div className="sec-head">
        <span className="plate">EXPERIENCE</span>
        <span className="sec-head__file">~/work · open a folder</span>
      </div>
      <div className="exp">
        {stack.map((e, i) => (
          <Folder
            key={e.org}
            e={e}
            tabIndex={i}
            open={open.has(e.org)}
            onToggle={() => toggle(e.org)}
          />
        ))}
      </div>
    </section>
  )
}
