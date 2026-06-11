/* ===== EDUCATION — green schedule timeline ===== */
import { Fragment } from 'react'
import DATA from '../data'

export default function Education() {
  const D = DATA
  return (
    <section className="education section" data-screen-label="Education" id="education">
      <div className="sec-head">
        <span className="plate">EDUCATION</span>
        <span className="sec-head__file">// the receipts</span>
      </div>

      <div className="sched">
        <div className="sched__side">SCHEDULE</div>
        <div className="sched__body">
          <div className="sched__heading">MY TIMELINE</div>
          {D.education.map((e, i) => (
            <Fragment key={e.school}>
              <div className="sched__row">
                <div className="sched__date term">’{e.date}</div>
                <div className="sched__info">
                  <div className="sched__school">{e.school}</div>
                  <div className="sched__degree">
                    {e.degree} · <span className="sched__when">{e.when}</span>
                  </div>
                  <div className="sched__note">{e.note}</div>
                  <div className="sched__extra wrap-pretty">{e.extra}</div>
                </div>
              </div>
              {i < D.education.length - 1 && (
                <div className="sched__div">
                  <span className="sched__star">✦</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
