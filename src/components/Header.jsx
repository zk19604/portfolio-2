/* ===== HEADER — fixed pixel-Mac menu bar (cute, on-theme) ===== */
const NAV = [
  ['ABOUT', '#about'],
  ['PROJECTS', '#projects'],
  ['WORK', '#experience'],
  ['SCHOOL', '#education'],
  ['SKILLS', '#skills'],
]

export default function Header() {
  return (
    <header className="topbar">
      <a className="topbar__logo" href="#top">
        <span className="topbar__face term">=^·ﻌ·^=</span>
        <span className="topbar__id">ZAINAB.SYS</span>
        <span className="blink topbar__caret">_</span>
      </a>

      <nav className="topbar__nav">
        {NAV.map(([label, href]) => (
          <a key={href} className="topbar__link" href={href}>
            {label}
          </a>
        ))}
      </nav>

      <a className="topbar__cta" href="/ZainabKhalil-resume.pdf" download>
        ↓ DOWNLOAD MY CV
      </a>
    </header>
  )
}
