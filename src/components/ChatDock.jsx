/* ===== CHAT DOCK — pixel cat resting atop a "chat with me" box wired to the
   FastAPI RAG backend (POST /api/ask -> { answer, sources }) ===== */
import { useEffect, useRef, useState } from 'react'

// base URL of the FastAPI RAG server (override with VITE_API_URL if needed)
const API = (
  import.meta.env.VITE_API_URL || 'https://portfolio-3d-production-9ce4.up.railway.app'
).replace(/\/$/, '')

/* ---- seal-point "Comnyang" sitting cat (same sprite as before) ---- */
const CAT_GRID = [
  '...G........G...',
  '...GG......GG...',
  '..GGG......GGG..',
  '..GGCCCCCCCCGG..',
  '.CCCCGGGGGGCCCC.',
  '.CCCGGGGGGGGCCC.',
  'CCCCGGGGGGGGCCCC',
  'CCCCGGGGGGGGCCCC',
  'CCCCGGGGGGGGCCCC',
  '.CCCGGGGGGGGCCC.',
  '..CCCCGGGGCCCC..',
  '..CCCCCCCCCCCC..',
  '.CCCCCCCCCCCCCC.',
  'CCCCCCCCCCCC.TT.',
  'CCCCCCCCCCCC.TT.',
  'CCCPPCCCCPPCC.TT',
  'CCCPPCCCCPPCCCTT',
  '.CCCCCCCCCCCCCC.',
]
const FUR = { C: '#efe9dd', G: '#968e84', P: '#5a524a', T: '#aaa298' }
const HEART_GRID = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a lazy tail that dangles below the far end of the pill while the chat is closed
const TAIL_GRID = [
  '.TT.',
  '.TT.',
  '.TTT',
  '..TT',
  '..TT',
  '.TTT',
  'TT..',
]

function TailSprite() {
  const ref = useRef(null)
  const phase = useRef(0)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const DARK = '#2b2722'
    const s = 5
    const OX = 8
    const OY = 6
    const COLS = TAIL_GRID[0].length
    const at = (r, c) => (TAIL_GRID[r] && TAIL_GRID[r][c]) || '.'
    const px = (x, y, w, hh, c) => {
      ctx.fillStyle = c
      ctx.fillRect(x, y, w, hh)
    }
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      // a gentle vertical sway so the dangling tail feels alive
      const oy = OY + Math.round(Math.sin(phase.current * 0.1) * 1)
      // dark outline (any empty cell touching a filled one)
      for (let r = 0; r < TAIL_GRID.length; r++)
        for (let c = 0; c < COLS; c++) {
          if (at(r, c) !== '.') continue
          let edge = false
          for (let dr = -1; dr <= 1 && !edge; dr++)
            for (let dc = -1; dc <= 1; dc++)
              if (at(r + dr, c + dc) !== '.') {
                edge = true
                break
              }
          if (edge) px(OX + c * s, oy + r * s, s, s, DARK)
        }
      // fur fill
      for (let r = 0; r < TAIL_GRID.length; r++)
        for (let c = 0; c < COLS; c++)
          if (at(r, c) === 'T') px(OX + c * s, oy + r * s, s, s, FUR.T)
    }
    const id = setInterval(() => {
      phase.current += 1
      draw()
    }, 120)
    draw()
    return () => clearInterval(id)
  }, [])
  return <canvas ref={ref} width={40} height={52} className="cat__cv chatdock__tailcv" />
}

function CatSprite({ mood }) {
  const ref = useRef(null)
  const phase = useRef(0)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const W = cv.width
    const H = cv.height
    const DARK = '#2b2722'
    const EYE = '#28241f'
    const NOSE = '#9a6e6e'
    const RED = '#e23b4e'
    const RED_D = '#b81d35'
    const s = 4
    const OX = 6
    const OY = 22
    const COLS = CAT_GRID[0].length
    const at = (r, c) => (CAT_GRID[r] && CAT_GRID[r][c]) || '.'
    function px(x, y, w, hh, c) {
      ctx.fillStyle = c
      ctx.fillRect(x, y, w, hh)
    }
    function draw() {
      ctx.clearRect(0, 0, W, H)
      const t = phase.current
      const bob = Math.round(Math.sin(t * 0.18) * 2)
      const oy = OY + bob
      const happy = mood.current === 'happy'
      for (let r = 0; r < CAT_GRID.length; r++) {
        for (let c = 0; c < COLS; c++) {
          if (at(r, c) !== '.') continue
          let edge = false
          for (let dr = -1; dr <= 1 && !edge; dr++)
            for (let dc = -1; dc <= 1; dc++) {
              if (at(r + dr, c + dc) !== '.') {
                edge = true
                break
              }
            }
          if (edge) px(OX + c * s, oy + r * s, s, s, DARK)
        }
      }
      for (let r = 0; r < CAT_GRID.length; r++) {
        for (let c = 0; c < COLS; c++) {
          const col = FUR[at(r, c)]
          if (col) px(OX + c * s, oy + r * s, s, s, col)
        }
      }
      const eye = (cx) => {
        if (happy) px(OX + cx * s, oy + (6 + 0.5) * s, 2 * s, 0.4 * s, EYE)
        else px(OX + cx * s, oy + (6 + 0.1) * s, 1.6 * s, 1.5 * s, EYE)
      }
      eye(4)
      eye(10)
      px(OX + 7.5 * s, oy + 8 * s, s, 0.8 * s, NOSE)
      if (happy) {
        const hs = 3
        const hb = Math.round(Math.sin(t * 0.3) * 2)
        const hx = OX + 8 * s - (HEART_GRID[0].length * hs) / 2
        const hy = 0 + hb + bob
        for (let r = 0; r < HEART_GRID.length; r++)
          for (let c = 0; c < HEART_GRID[r].length; c++)
            if (HEART_GRID[r][c] === 'H')
              px(hx + c * hs, hy + r * hs, hs, hs, r >= 4 ? RED_D : RED)
      }
    }
    const id = setInterval(() => {
      phase.current += 1
      draw()
    }, 70)
    draw()
    return () => clearInterval(id)
  }, [mood])
  return <canvas ref={ref} width={76} height={100} className="cat__cv" />
}

/* ---- the dock ---- */
export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { who: 'bot', text: "hi! i'm zainab's lil assistant — ask me about her projects, experience, education or skills ♥" },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const mood = useRef('idle')
  const moodTimer = useRef(null)
  const bodyRef = useRef(null)

  // pet her by hovering the head
  const pet = () => {
    mood.current = 'happy'
    clearTimeout(moodTimer.current)
    moodTimer.current = setTimeout(() => {
      mood.current = 'idle'
    }, 1200)
  }

  // keep the transcript pinned to the newest message
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, open, busy])

  const send = async (e) => {
    e?.preventDefault()
    const q = input.trim()
    if (!q || busy) return
    setInput('')
    setMsgs((m) => [...m, { who: 'me', text: q }])
    setBusy(true)
    try {
      const res = await fetch(`${API}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMsgs((m) => [...m, { who: 'bot', text: data.answer || '…' }])
    } catch {
      setMsgs((m) => [
        ...m,
        { who: 'bot', text: "hmm, i can't reach the server right now — try again in a bit ✗" },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="chatdock">
      <div className="chatdock__stage">
        {/* the cat sits on the top border of the box below */}
        <div
          className="chatdock__cat"
          onMouseMove={pet}
          onMouseEnter={pet}
          title="pet me ♥"
        >
          <CatSprite mood={mood} />
        </div>

        {/* when collapsed, her tail dangles over the far end of the pill */}
        {!open && (
          <div className="chatdock__tail" aria-hidden="true">
            <TailSprite />
          </div>
        )}

        {open ? (
          <div className="chatpanel" role="dialog" aria-label="Chat with Zainab">
            <div className="chatpanel__head">
              <span className="chatpanel__dot" />
              <span className="chatpanel__title">CHAT WITH ME</span>
              <button
                className="chatpanel__x"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="chatpanel__body" ref={bodyRef}>
              {msgs.map((m, i) => (
                <div key={i} className={`chatmsg chatmsg--${m.who}`}>
                  {m.text}
                </div>
              ))}
              {busy && (
                <div className="chatmsg chatmsg--bot chatmsg--typing">typing…</div>
              )}
            </div>

            <form className="chatpanel__form" onSubmit={send}>
              <input
                className="chatpanel__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything…"
                aria-label="Your message"
              />
              <button className="chatpanel__send" type="submit" disabled={busy}>
                ➤
              </button>
            </form>
          </div>
        ) : (
          <button className="chatdock__toggle" onClick={() => setOpen(true)}>
            ✦ chat with me
          </button>
        )}
      </div>
    </div>
  )
}
