/* ===== ABOUT — ASCII portrait with cursor-repulsion physics + Mac window ===== */
import { useEffect, useRef } from 'react'
import DATA from '../data'

const RAW = `                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                x  kuCx                                             
                                           #)<!"\\ ":^+~l}n\$                                         
                                          /;:I,'.;~\\\`^>!:""ill                                       
                                        \\\\l,":""';~?:>I^^>!.,"}                                      
                                      {~+>,""l!>1n){_lI;",l"",<                                     
                                     ~+_+>lII>z0JmLCUr)I\\\`,.;I\\\`II                                    
                                     _+?1_I:icQQO00LCYu|i\\\`^:!\\\`':!                                   
                                    U[]?[..;tvfJL0LCt}~Il,  "l\\\`'\\\`j                                  
                                    u[1}<. fXcnrjnYn(//?<-:'^;;  "                                  
                                    j_|?\\ i/?-lr/vJU|rn\\\\\\\\1[<.'^" '_                                 
                                    )[<;  xYCCJUYULCrjU0CUx(I .^^\\ }                                 
                                    /-'   YZZmOLYUXn>f/LJUv/]   \\\`"v                                 
                                    ]l\\\`   jLLCYvCJczurvccuf),   ::-                                 
                                    <"'    zzcnvzfjj(}?)xrt(.   \\\`'_                                 
                                    1>'\\\` l\\ YJYXJfn/|1jrv/|.    .'i                                 
                                    <+,\\\`^.  .|XJ0LJUYYzx){.  .  ..:I                                
                                    ?++\\\`\\\`^ ' If/vCQJUv)__>  ..   \\\`::",;}_d                          
                                   U\\\\+]>"""^ ')rnur|1()({!  \\\`,,   .;:;!iI!>(                        
                                 /{Il, .' ' \\\`."[XUYXuunv+,' ^^^^:. \\\` "IIlI;^:]                      
                             z-  ";;;ll!ili>::lii<i<>i>iiI^\\\` 'I"I,^,..,>>!!;l"1                     
                            +\\\`. I!",;ii+<<~+___{t;lil!i>^"..\\ .;:i+.I'";<;<<i!!>-                    
                           b:I]]Il:I:lI;\\\`I<+~<~+/wj)Yjl,'"^,.'.~>_;<ii!+~+_<!l>>h                   
                           (~_<!;i,ii,ll,+ i>\\\`i!i<-;"l,>>,"' .''>\\\`I";!~_?-<__><><x                  
                         r>};li!l,!,!:l^":^l<:>>>~~{_!l+,i>, .!l<:. :+~?-?-_-+>><>w                 
                       +-<_il!>!,;i:;;l!,;^i<::~!i<~?i<l:_i^^."^<?\\ iI~--]]?__+_I>+\$                
                     |i{i!+!i<>i^;I,<ilI:I,>>~ >~>_>>!<^i<I>,", I.^I::+-}][]{}-i~<>~                
                   ,?<_]i>~~l><l"^!^l>l:~!"+>?;.++>~_+;,~ii!^I'"\\ ' 'i '~<_}}}?}<--<<><               
                  i?~+><<i<~ll>,\\\`\\\` ,ilI:+!:+>-~.,]"!~~,;l']]:~il" :_\\\`:~~[}[[?+_[?_~~>+              
                ;;+i!i>><i><,ll^.. ^>I,i~>I+~+]:'<~,lII^,<^<I,,\\\`!i\\\`-+,;l+?][][}]?__~~<)             
               ]!'ll!!i>i!!I:,^'.  ^>;:I<_>+-+?~.\\\`!..l,,""<"\\\`:^'\\\` \\\`'"\\\`li~-?{}}{{[]_-+></            
             ~(]+;I,IliiII:,^\\ \\\`'.   "l:,;<?~+__-]<,.<"!i?--]>iii+<I^'i.!i~_[)}{{{}[]-_+~<t           
            >_:;,":"""";:'''..     :l^:Ii<-+__?-<l^.^;<>_-]?!l<__i"\\ :I;l<-]}[{{{1}?__~~>~+          
          j{-<^"",^\\\`^^\\ .. ...      ::\\\`IIiiii>_][??l,if{',>+?_!>_~~;",+"l<<+_?[[[[}}}[]~>IIh         
         t>^'I,;:\\\`\\\`\\\`^"\\ \\\`'...\\ ..  -tvfnXULmmmwpwmwmjv|zccn1_^_L0<~I...\\ ; "l,+]]]?}}}}[[_<iik         
        \$-,,I;IIIlI,;,^II;"\\ Ill",:{-fQppkkkhbddbbdc/qqwZZQk&+~~<^.<<i"<?++i,;+_:i+]?]?}~_i-         
        -\\\`",,IlI!lI",l!i!IIIl;lvd\\\\8YrzXXYUJJYuvvuwUYbbddLU\\\\+?-~^~<~-?_,l]]->";\\~][_i<?--~~>!Q        
       B^:^,:ll!!lliil!ii;!:X:/>nnZmmwOwwwqqqwwOZQ|1qdpd(Y-?}{_'>_i+?-!i~?[?-<<+-][]][l+~ilj        
       B\\\`\\\`::;IIl!iii!!l!<iiM%zjxwddbbbbbbkkbbddpwmOCnJZm1Z![{}]><+>i-_??_+_?_>}}[[_+-[><>!I!        
        I","I-<_^^",";,;J*OmZfcmppdbdbbbkkbpqqqqqppqqQXr*{?][?--??+!_+-]}{}[[?^[?_--}<~_<!l<x       
        Q-\\\`"~+<+~~_X/}/"[?]?(fvXJUCLOZZZ0QCnr/\\\`.\\{J0wqqw0JO/<____+?[+<+-]}}[]{]]I-]]]__++~!lIx       
         ]:+__-<]Y1^.... .''I>i!^)>[UY0CYJUJCJCJLZLxvruUXUJJ]++<<+~~]+}????[}}[-;~?+]]_+~il;x       
           X?]_-_r|     '^;,I-<L                            xc>{<<<~<+~~___--_???i>++-+~<>llt       
               /\\\\/nz''''1/Ux                                    u({>>>>>~~+~~+<+~<+~_+~+<>i!        
                                                                     Y??+<>>><<~<~<<~>~<>i;\\\`[       
                                                                          xn|{}(_i><~<+>lll\\\\        
                                                                                   ] ,!CC]          `

function PixelPortrait() {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const ctx = canvas.getContext('2d')

    // trim fully-blank leading/trailing rows so the figure fills the frame
    let allLines = RAW.split('\n')
    while (allLines.length && allLines[0].trim() === '') allLines.shift()
    while (allLines.length && allLines[allLines.length - 1].trim() === '') allLines.pop()
    const lines = allLines
    const ROWS = lines.length
    const COLS = Math.max(...lines.map((l) => l.length))

    const CELL_W = 6.6
    const CELL_H = 10.8 // elongated vertically to fill the frame
    const FONT_SIZE = 11

    canvas.width = Math.ceil(COLS * CELL_W)
    canvas.height = Math.ceil(ROWS * CELL_H)
    ctx.font = `${FONT_SIZE}px 'Courier New', monospace`
    ctx.textBaseline = 'top'

    const chars = []
    for (let r = 0; r < ROWS; r++) {
      const line = lines[r] || ''
      for (let c = 0; c < COLS; c++) {
        const ch = line[c] || ' '
        if (ch !== ' ') {
          chars.push({ ch, homeX: c * CELL_W, homeY: r * CELL_H, x: c * CELL_W, y: r * CELL_H, vx: 0, vy: 0 })
        }
      }
    }

    const REPEL_RADIUS = 70
    const REPEL_STRENGTH = 2800
    const FRICTION = 0.72
    const RETURN_SPRING = 0.12

    let mouseX = -9999
    let mouseY = -9999
    let isHover = false

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width)
      mouseY = (e.clientY - rect.top) * (canvas.height / rect.height)
      isHover = true
    }
    const onLeave = () => {
      isHover = false
      mouseX = -9999
      mouseY = -9999
    }
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)

    const getColor = (ch) => {
      if ('@#08GC'.includes(ch)) return '#7df0dd'
      if ('mwbdpqkL0ZOQUJ'.includes(ch)) return '#3fb8a8'
      return '#1d7a70'
    }

    let rafId
    const draw = () => {
      ctx.fillStyle = '#0c1c2e'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < chars.length; i++) {
        const p = chars[i]
        if (isHover) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const dist2 = dx * dx + dy * dy
          const dist = Math.sqrt(dist2)
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = REPEL_STRENGTH / (dist2 + 1)
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }
        p.vx += (p.homeX - p.x) * RETURN_SPRING
        p.vy += (p.homeY - p.y) * RETURN_SPRING
        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = getColor(p.ch)
        ctx.fillText(p.ch, p.x, p.y)
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={stageRef} className="portrait__stage">
      <canvas ref={canvasRef} className="portrait__cv" />
    </div>
  )
}

export default function About() {
  const D = DATA
  return (
    <section className="about section" data-screen-label="About" id="about">
      <div className="sec-head">
        <span className="plate">ABOUT ME</span>
        <span className="sec-head__file">~/about/zainab.txt</span>
      </div>

      <div className="about__grid">
        <div className="about__portrait">
          <div className="portrait scanlines">
            <PixelPortrait />
            <div className="portrait__tag">IMG_001 · zainab.bmp</div>
          </div>
          <div className="portrait__cap">// 16-bit me. yes that's the vibe.</div>
        </div>

        <div className="win about__win">
          <div className="win__bar">
            <span className="win__close"></span>
            <span className="win__title">about_me.rtf</span>
          </div>
          <div className="win__body about__body">
            {D.about.map((p, i) => (
              <p key={i} className="about__p wrap-pretty">
                {p}
              </p>
            ))}
            <div className="about__stats">
              <div className="stat">
                <b className="term">3.74</b>
                <span>GPA / 4.0</span>
              </div>
              <div className="stat">
                <b className="term">5K+</b>
                <span>users shipped to</span>
              </div>
              <div className="stat">
                <b className="term">4 A*</b>
                <span>A-Levels</span>
              </div>
              <div className="stat">
                <b className="term">∞</b>
                <span>side quests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
