import { useEffect, useRef } from 'react'

const MAZE = [
  '###################',
  '#........#........#',
  '#o##.###.#.###.##o#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.### # ###.####',
  '   #.#   G   #.#   ',
  '####.# ##=## #.####',
  '#......#   #......#',
  '####.# ##### #.####',
  '   #.#       #.#   ',
  '####.# ##### #.####',
  '#........#........#',
  '#.##.###.#.###.##.#',
  '#o.#.....P.....#.o#',
  '##.#.#.#####.#.#.##',
  '#....#...#...#....#',
  '#.######.#.######.#',
  '#.................#',
  '###################',
]
const COLS = MAZE[0].length
const ROWS = MAZE.length
const TILE = 8
const TOPBAR = 14
const W = COLS * TILE
const H = ROWS * TILE + TOPBAR

const DIRS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }
const OPP = { up: 'down', down: 'up', left: 'right', right: 'left' }
const HOME = { col: 9, row: 9 }
const GHOST_COLORS = ['#e0594b', '#efa9c4', '#62c6e8', '#f2c021']

function isWall(col, row, forGhost) {
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return true
  const c = MAZE[row][col]
  if (c === '#') return true
  if (c === '=') return !forGhost
  return false
}

function makeEntity(col, row, dir) {
  return { col, row, tcol: col, trow: row, dir, t: 0, moving: false }
}

function initState() {
  const dots = new Set()
  const pellets = new Set()
  let pac = makeEntity(9, 15, null)
  MAZE.forEach((line, r) => {
    for (let c = 0; c < line.length; c++) {
      const ch = line[c]
      if (ch === '.') dots.add(`${c},${r}`)
      else if (ch === 'o') {
        dots.add(`${c},${r}`)
        pellets.add(`${c},${r}`)
      } else if (ch === 'P') pac = makeEntity(c, r, null)
    }
  })
  const spawns = [
    [9, 7],
    [8, 9],
    [9, 9],
    [10, 9],
  ]
  const ghosts = spawns.map(([c, r], i) => ({
    ...makeEntity(c, r, 'up'),
    color: GHOST_COLORS[i],
    mode: 'chase',
    release: i * 80,
  }))
  return { pac, ghosts, dots, pellets, score: 0, lives: 3, fright: 0, frame: 0, status: 'start', deathTimer: 0, overTimer: 0 }
}

function stepEntity(e, speed, forGhost, chooseDir) {
  if (!e.moving) {
    chooseDir(e)
    const d = DIRS[e.dir]
    if (e.dir && !isWall(e.col + d.x, e.row + d.y, forGhost)) {
      e.tcol = e.col + d.x
      e.trow = e.row + d.y
      e.moving = true
    } else return
  }
  e.t += speed
  if (e.t >= 1) {
    e.t = 0
    e.col = e.tcol
    e.row = e.trow
    e.moving = false
    chooseDir(e)
    const d = DIRS[e.dir]
    if (e.dir && !isWall(e.col + d.x, e.row + d.y, forGhost)) {
      e.tcol = e.col + d.x
      e.trow = e.row + d.y
      e.moving = true
    }
  }
}

function lerp(e) {
  return {
    x: (e.col + (e.tcol - e.col) * e.t) * TILE + TILE / 2,
    y: (e.row + (e.trow - e.row) * e.t) * TILE + TILE / 2 + TOPBAR,
  }
}

export default function GameBoy() {
  const canvasRef = useRef(null)
  const inputRef = useRef(null)
  const pressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let s = initState()
    let raf

    const free = (c, r, fg) => !isWall(c, r, fg)

    const ghostChoose = (g) => (e) => {
      const valid = Object.keys(DIRS).filter((dir) => {
        if (dir === OPP[e.dir]) return false
        const d = DIRS[dir]
        return free(e.col + d.x, e.row + d.y, true)
      })
      const opts = valid.length ? valid : [OPP[e.dir]].filter(Boolean)
      if (!opts.length) return
      let target
      if (g.mode === 'eaten') target = HOME
      else if (s.fright > 0) {
        e.dir = opts[Math.floor(Math.random() * opts.length)]
        return
      } else target = { col: s.pac.col, row: s.pac.row }
      if (Math.random() < 0.12) {
        e.dir = opts[Math.floor(Math.random() * opts.length)]
        return
      }
      let best = opts[0]
      let bd = Infinity
      for (const dir of opts) {
        const d = DIRS[dir]
        const dist = (e.col + d.x - target.col) ** 2 + (e.row + d.y - target.row) ** 2
        if (dist < bd) {
          bd = dist
          best = dir
        }
      }
      e.dir = best
    }

    const pacChoose = (e) => {
      const want = inputRef.current
      if (want) {
        const d = DIRS[want]
        if (free(e.col + d.x, e.row + d.y, false)) {
          e.dir = want
          return
        }
      }
      const d = DIRS[e.dir]
      if (e.dir && !free(e.col + d.x, e.row + d.y, false)) e.dir = null
    }

    const sameTile = (a, b) => {
      const an = a.t < 0.5 ? { c: a.col, r: a.row } : { c: a.tcol, r: a.trow }
      const bn = b.t < 0.5 ? { c: b.col, r: b.row } : { c: b.tcol, r: b.trow }
      return an.c === bn.c && an.r === bn.r
    }

    const loop = () => {
      s.frame++

      if (s.status === 'start') {
        if (s.startAt == null) s.startAt = pressRef.current
        else if (pressRef.current > s.startAt) {
          s.status = 'play'
          inputRef.current = null
        }
      } else if (s.status === 'play') {
        if (s.fright > 0) s.fright--
        stepEntity(s.pac, 0.11, false, pacChoose)   // was 0.14

        const key = `${s.pac.col},${s.pac.row}`
        if (s.dots.has(key)) {
          s.dots.delete(key)
          if (s.pellets.has(key)) {
            s.pellets.delete(key)
            s.fright = 420
            s.ghosts.forEach((g) => g.mode === 'chase' && (g.mode = 'fright'))
            s.score += 50
          } else s.score += 10
          if (s.dots.size === 0) s.status = 'win'
        }

        s.ghosts.forEach((g) => {
          if (s.frame < g.release) return
          if (s.fright === 0 && g.mode === 'fright') g.mode = 'chase'
          let speed = 0.07    // was 0.105
          if (g.mode === 'fright') speed = 0.05  // was 0.07
          if (g.mode === 'eaten') speed = 0.17    // was 0.24
          stepEntity(g, speed, true, ghostChoose(g))
          if (g.mode === 'eaten' && g.col === HOME.col && g.row === HOME.row && !g.moving) g.mode = 'chase'
        })

        s.ghosts.forEach((g) => {
          if (s.frame < g.release || g.mode === 'eaten') return
          if (sameTile(s.pac, g)) {
            if (g.mode === 'fright') {
              g.mode = 'eaten'
              s.score += 200
            } else {
              s.lives--
              s.status = s.lives <= 0 ? 'over' : 'dead'
              s.deathTimer = 60
              if (s.status === 'over') s.overTimer = 140
            }
          }
        })
      } else if (s.status === 'dead') {
        s.deathTimer--
        if (s.deathTimer <= 0) {
          const fresh = initState()
          fresh.dots = s.dots
          fresh.pellets = s.pellets
          fresh.score = s.score
          fresh.lives = s.lives
          fresh.status = 'play'
          s = fresh
        }
      } else if (s.status === 'over' || s.status === 'win') {
        if (s.restartAt == null) s.restartAt = pressRef.current
        else if (pressRef.current > s.restartAt) s = initState()
      }

      /* ---- draw ---- */
      ctx.fillStyle = '#0a0a14'
      ctx.fillRect(0, 0, W, H)

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const m = MAZE[r][c]
          if (m === '#') {
            ctx.fillStyle = '#2a63e8'
            ctx.fillRect(c * TILE + 1, r * TILE + TOPBAR + 1, TILE - 2, TILE - 2)
            ctx.fillStyle = '#0a0a14'
            ctx.fillRect(c * TILE + 2, r * TILE + TOPBAR + 2, TILE - 4, TILE - 4)
          } else if (m === '=') {
            ctx.fillStyle = '#efa9c4'
            ctx.fillRect(c * TILE + 1, r * TILE + TOPBAR + TILE / 2 - 1, TILE - 2, 2)
          }
        }
      }

      s.dots.forEach((k) => {
        const [c, r] = k.split(',').map(Number)
        const cx = c * TILE + TILE / 2
        const cy = r * TILE + TILE / 2 + TOPBAR
        if (s.pellets.has(k)) {
          if (Math.floor(s.frame / 15) % 2 === 0) {
            ctx.fillStyle = '#fff3b0'
            ctx.beginPath()
            ctx.arc(cx, cy, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        } else {
          ctx.fillStyle = '#f3e2a0'
          ctx.fillRect(cx - 1, cy - 1, 2, 2)
        }
      })

      s.ghosts.forEach((g) => {
        const p = lerp(g)
        let body = g.color
        if (g.mode === 'eaten') body = null
        else if (g.mode === 'fright')
          body = s.fright < 120 && Math.floor(s.frame / 10) % 2 === 0 ? '#dfe6ff' : '#2244bb'
        if (body) {
          ctx.fillStyle = body
          ctx.beginPath()
          ctx.arc(p.x, p.y - 1, 3.4, Math.PI, 0)
          ctx.lineTo(p.x + 3.4, p.y + 3)
          ctx.lineTo(p.x - 3.4, p.y + 3)
          ctx.closePath()
          ctx.fill()
        }
        ctx.fillStyle = '#fff'
        ctx.fillRect(p.x - 2.5, p.y - 2, 2, 2.5)
        ctx.fillRect(p.x + 0.5, p.y - 2, 2, 2.5)
        ctx.fillStyle = '#16204a'
        const ed = DIRS[g.dir] || { x: 0, y: 0 }
        ctx.fillRect(p.x - 2 + ed.x, p.y - 1.5 + ed.y, 1, 1.5)
        ctx.fillRect(p.x + 1 + ed.x, p.y - 1.5 + ed.y, 1, 1.5)
      })

      if (s.status !== 'dead' || Math.floor(s.frame / 6) % 2 === 0) {
        const p = lerp(s.pac)
        const baseAng = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[s.pac.dir || 'left']
        const mouth = (Math.abs(Math.sin(s.frame * 0.15)) * 0.32 + 0.04) * Math.PI  // was 0.25
        ctx.fillStyle = '#f7d51d'
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.arc(p.x, p.y, 3.6, baseAng + mouth, baseAng - mouth + Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      // HUD
      ctx.fillStyle = '#0a0a14'
      ctx.fillRect(0, 0, W, TOPBAR)
      ctx.fillStyle = '#f7d51d'
      ctx.font = '8px "Courier New", monospace'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${s.score}`, 4, TOPBAR / 2)
      ctx.textAlign = 'right'
      ctx.fillText('● '.repeat(Math.max(0, s.lives)).trim(), W - 4, TOPBAR / 2)

      if (s.status === 'start') {
        ctx.fillStyle = 'rgba(8,12,28,0.82)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.fillStyle = '#f7d51d'
        ctx.fillText('PLAY GAME?', W / 2, H / 2 - 6)
        if (Math.floor(s.frame / 18) % 2 === 0) {
          ctx.fillStyle = '#7df0dd'
          ctx.fillText('press a key = yes', W / 2, H / 2 + 8)
        }
      }

      if (s.status === 'win' || s.status === 'over') {
        ctx.fillStyle = 'rgba(8,12,28,0.78)'
        ctx.fillRect(0, 0, W, H)
        ctx.textAlign = 'center'
        ctx.fillStyle = s.status === 'win' ? '#7df0dd' : '#e0594b'
        ctx.fillText(s.status === 'win' ? 'YOU WIN!' : 'GAME OVER', W / 2, H / 2 - 6)
        if (Math.floor(s.frame / 18) % 2 === 0) {
          ctx.fillStyle = '#f7d51d'
          ctx.fillText('press a key', W / 2, H / 2 + 8)
        }
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
    const onKey = (e) => {
      if (map[e.code]) {
        e.preventDefault()
        inputRef.current = map[e.code]
        pressRef.current++
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const dpad = (dir) => () => {
    inputRef.current = dir
    pressRef.current++
  }

  return (
    <div className="gb">
      <div className="gb__top">
        <span className="gb__coin">◉</span>
        <span className="gb__title">··· PAC·DEV ···</span>
        <span className="gb__coin">◉</span>
      </div>
      <div className="gb__screen scanlines">
        <canvas ref={canvasRef} width={W} height={H} className="gb__canvas pixelated" />
      </div>
      <div className="gb__brand">ZK&nbsp;NINTENDO&nbsp;</div>
      <div className="gb__controls">
        <div className="gb__dpad">
          <button className="gb__d gb__d--up" onClick={dpad('up')} aria-label="up">▲</button>
          <button className="gb__d gb__d--left" onClick={dpad('left')} aria-label="left">◀</button>
          <span className="gb__d gb__d--mid"></span>
          <button className="gb__d gb__d--right" onClick={dpad('right')} aria-label="right">▶</button>
          <button className="gb__d gb__d--down" onClick={dpad('down')} aria-label="down">▼</button>
        </div>
        <div className="gb__ab">
          <button className="gb__btn gb__btn--b" onClick={dpad('up')}>B</button>
          <button className="gb__btn gb__btn--r" onClick={dpad('right')}>A</button>
        </div>
      </div>
      <div className="gb__speaker">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
    </div>
  )
}