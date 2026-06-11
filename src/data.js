/* ===== Zainab Khalil — content (from CV) ===== */
const DATA = {
  name: 'ZAINAB KHALIL',
  role: 'CS Student · Full-Stack Developer',
  tagline: 'I build things that ship — B2B SaaS, microservices & AI pipelines.',
  location: 'Lahore, Pakistan',

  about: [
    "Hi, I'm Zainab — a Computer Science student at FAST NUCES (Dean's List, GPA 3.74) who loves turning messy ideas into software that actually ships.",
    "I've built full-stack features for live SaaS used by 5K+ professionals, architected fault-tolerant microservices, and wired up AI pipelines that turn raw text into deployed websites.",
    "When I'm not chasing clean architecture, I'm collecting A*'s and over-engineering side projects for fun.",
  ],

  links: [
    { label: 'GitHub', short: 'zk19604', href: 'https://github.com/zk19604' },
    { label: 'LinkedIn', short: 'zainab-khalil', href: 'https://linkedin.com/in/zainab-khalil-332b1831b' },
    { label: 'Email', short: 'zainab19604khalil@gmail.com', href: 'mailto:zainab19604khalil@gmail.com' },
    { label: 'Portfolio', short: 'zk19604.github.io', href: 'https://zk19604.github.io/portfolio' },
  ],

  projects: [
    {
      name: 'ResuFlow',
      sub: 'AI CV → Portfolio pipeline',
      stack: 'React · Node · MongoDB · Gemini',
      tint: 'var(--sky)',
      desc: 'End-to-end pipeline that turns unstructured CV data into a deployed portfolio site — Gemini extracts validated JSON, Vercel auto-deploys, QR code for one-click sharing.',
      links: { code: 'https://github.com/zk19604/resuflow', live: 'https://resuflow-three.vercel.app' },
    },
    {
      name: 'HomeFinder',
      sub: 'Android housing app',
      stack: 'Java · Firebase · Cloudinary',
      tint: 'var(--pink)',
      desc: 'Full-stack Android app with tenant & landlord flows, auth and real-time sync. 100+ property listings on Firebase with AI-based recommendations.',
      links: { code: 'https://github.com/zk19604' },
    },
    {
      name: 'DropTheDB',
      sub: 'Mood -> music social platform',
      stack: 'React · Node · SQL Server · Spotify',
      tint: 'var(--sun)',
      desc: 'Full-stack music social platform — search & like songs via the Spotify API, build playlists, connect with friends, and get Gemini-powered mood-based recommendations over a custom SQL Server schema.',
      links: { code: 'https://github.com/zk19604/dropthedb' },
    },
    {
      name: 'Sudoku (Assembly)',
      sub: 'x86 8088 console game',
      stack: 'Assembly · x86 8088',
      tint: 'var(--olive)',
      desc: 'A fully playable Sudoku game written in x86 8088 assembly — modular screen rendering and direct video-memory manipulation for fast, console-based gameplay.',
      links: { code: 'https://github.com/zk19604/sudoku-game' },
    },
    {
      name: 'Portfolio 3D',
      sub: 'Interactive 3D portfolio',
      stack: 'JavaScript · WebGL · Vercel',
      tint: 'var(--sky-deep)',
      desc: 'An interactive 3D take on the personal-portfolio idea — playful, scene-driven and deployed on Vercel.',
      links: { code: 'https://github.com/zk19604/portfolio-3d', live: 'https://portfolio-3d-nu-six.vercel.app' },
    },




  ],

  experience: [
    {
      role: 'Software Engineer Intern',
      org: 'AICE XPERT',
      dates: 'Jan 2026 – Apr 2026',
      color: 'var(--olive)',
      bullets: [
        'Expanded a live B2B SaaS platform to 5K+ professionals — shipped card management, QR customisation & NFC integration across a Next.js / Express / Supabase stack.',
        'Built a live phone-preview component with instant QR rendering (20+ dot shapes, gradient fills, custom logos), killing all third-party QR tool dependencies.',
        'Shipped a cross-platform analytics pipeline tracking taps, geo-location, device breakdowns & link clicks — driving the premium upsell strategy.',
        'Engineered 10+ RESTful endpoints in a 4-member Agile team.',
      ],
    },
    {
      role: 'Database Teaching Assistant',
      org: 'FAST NUCES',
      dates: 'Jan 2026 – May 2026',
      color: 'var(--sky)',
      bullets: [
        'Supported delivery of a database course for 50+ students, providing academic and technical guidance throughout the semester.',
        'Evaluated assignments, quizzes & coursework, giving constructive feedback to lift student performance.',
        'Helped students master core concepts — SQL, normalization, ER diagrams & relational database design.',
        'Partnered with the instructor to uphold grading standards and keep course operations running smoothly.',
      ],
    },
    {
      role: 'Software Engineering Intern',
      org: 'INFOTECH',
      dates: 'Jul 2025 – Aug 2025',
      color: 'var(--pink)',
      bullets: [
        'Architected 5+ microservices with Spring Boot, applying SOLID principles & clean architecture for maintainability and scale.',
        'Implemented service discovery via Netflix Eureka across distributed services — dynamic routing + fault-tolerant comms.',
        'Centralised routing through an API Gateway, consolidating 10+ endpoints and improving observability, security & traceability.',
      ],
    },
  ],

  education: [
    {
      date: '27',
      school: 'FAST NUCES',
      degree: 'BS Computer Science',
      when: '2023 – Expected May 2027',
      note: "GPA 3.74 / 4.0 · Dean's List (2023–2025)",
      extra: 'Coursework: DSA, OS, DB Systems, Networks, ML, AI, Software Engineering.',
    },
    {
      date: '23',
      school: 'SICAS',
      degree: 'A-Levels',
      when: 'Aug 2021 – Jun 2023',
      note: '4 A* — Math · Physics · Biology · Chemistry',
      extra: '3rd Position in Punjab (best across 3 A-Levels) · Top in Pakistan for Biology (O-Levels).',
    },
  ],

  skills: [
    'C++', 'Java', 'JavaScript', 'Assembly x86',
    'React', 'Next.js', 'Node.js', 'Spring Boot', 'Android',
    'SQL Server', 'MySQL', 'MongoDB', 'Firebase',
    'DSA', 'OOP', 'System Design', 'Microservices',
    'Git', 'Postman', 'REST APIs', 'Gemini API',
    'Spotify API', 'Cloudinary', 'Eureka', 'Vercel',
  ],

  
}

export default DATA
