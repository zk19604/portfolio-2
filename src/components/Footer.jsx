/* ===== FOOTER ===== */
import DATA from '../data'

export default function Footer() {
  const D = DATA
  return (
    <footer className="footer" data-screen-label="Footer" id="footer">
      <div className="footer__inner section">
        <div className="footer__top">
          <div className="footer__sign term">THANKS FOR SCROLLING ✦</div>
          <div className="footer__name pixel">{D.name}</div>
        </div>
        <div className="footer__links">
          {D.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="footer__link">
              <span className="footer__linklabel pixel">{l.label}</span>
              <span className="footer__linkval">{l.short}</span>
            </a>
          ))}
        </div>
        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {D.name}. built pixel by pixel.
          </span>
          <a href="#top" className="footer__top-link">
            ▲ back to start
          </a>
        </div>
      </div>
    </footer>
  )
}
