import type {
  ExperienceItem,
  NavSection,
  Project,
  Skill,
  SocialLink,
} from '../types';

export const SITE = {
  name: 'Alex Rivera',
  initials: 'AR',
  role: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'React Native Engineer',
    'UI Systems Builder',
    'API Architect',
  ],
  tagline:
    'I craft luminous digital products — glass-smooth interfaces, resilient APIs, and experiences that feel inevitable.',
  email: 'hello@alexrivera.dev',
  location: 'Remote · Worldwide',
  availability: 'Available for opportunities',
  resumeUrl: 'https://alexrivera.dev/resume.pdf',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api',
};

export const NAV_LINKS: { id: NavSection; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/alexrivera', icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/alexrivera',
    icon: 'linkedin',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/alexrivera.dev',
    icon: 'instagram',
  },
  { id: 'mail', label: 'Email', url: `mailto:${SITE.email}`, icon: 'mail' },
];

export const ABOUT = {
  intro:
    'I am a full stack developer who obsesses over the intersection of craft and clarity. From pixel-level polish to production-grade APIs, I design systems that feel premium and perform under pressure.',
  journey:
    'My path started with curious late-night experiments in the browser, evolved through shipping React and Node products for startups, and matured into building cross-platform experiences with Expo that feel native everywhere.',
  passion:
    'I care deeply about motion that communicates, typography that breathes, and architecture that stays elegant as products grow. Glassmorphism, accessibility, and thoughtful interaction design are part of my everyday toolkit.',
  goals:
    'I want to partner with ambitious teams building products that people remember — AI-assisted tools, creative platforms, and developer-facing experiences that raise the bar for what software can feel like.',
  stats: [
    { label: 'Projects shipped', value: '42+' },
    { label: 'Technologies explored', value: '30+' },
    { label: 'Years building', value: '6+' },
    { label: 'Happy collaborators', value: '18+' },
  ],
};

export const SKILLS: Skill[] = [
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Frontend',
    description: 'Modern ESNext patterns, async architecture, and robust UI logic.',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Strict typing, domain modeling, and safer full-stack contracts.',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'Component systems, performance, and expressive interaction layers.',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend',
    description: 'Semantic structure and accessible document foundations.',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend',
    description: 'Layout systems, glass surfaces, and motion-friendly styling.',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    description: 'Event-driven services, tooling, and production API runtimes.',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'Backend',
    description: 'Clean REST surfaces with middleware-first architecture.',
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    category: 'Backend',
    description: 'Flexible document models and practical data access patterns.',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'Backend',
    description: 'Validated endpoints, clear errors, and client-friendly contracts.',
  },
  {
    id: 'rn',
    name: 'React Native',
    category: 'Mobile',
    description: 'Shared UI systems that feel native across platforms.',
  },
  {
    id: 'expo',
    name: 'Expo',
    category: 'Mobile',
    description: 'Fast shipping with Expo Router, modules, and web parity.',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    description: 'Branch strategies, reviews, and dependable delivery workflows.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    description: 'Collaboration, CI-ready repos, and open-source craftsmanship.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'lumen-desk',
    title: 'Lumen Desk',
    tagline: 'A glassmorphic productivity OS for creative teams',
    description:
      'Cross-platform workspace with realtime boards, ambient focus modes, and a design system that adapts seamlessly between dark midnight and soft daylight themes.',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    technologies: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'TypeScript'],
    features: [
      'Realtime collaborative boards',
      'Theme-aware glass design system',
      'Focus timers with ambient audio scenes',
      'Role-based workspace permissions',
    ],
    liveUrl: 'https://example.com/lumen-desk',
    githubUrl: 'https://github.com/alexrivera/lumen-desk',
    featured: true,
  },
  {
    id: 'orbit-pay',
    title: 'Orbit Pay',
    tagline: 'Mobile-first fintech experience with cinematic motion',
    description:
      'A premium payments companion featuring animated balances, biometric flows, and a resilient Express API with Zod-validated transaction pipelines.',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    technologies: ['Expo', 'Reanimated', 'Express', 'Zod', 'MongoDB'],
    features: [
      'Animated wallet insights',
      'Secure transfer confirmation flows',
      'Offline-friendly transaction queue',
      'Accessible contrast-safe theming',
    ],
    liveUrl: 'https://example.com/orbit-pay',
    githubUrl: 'https://github.com/alexrivera/orbit-pay',
    featured: true,
  },
  {
    id: 'nova-folio',
    title: 'Nova Folio API',
    tagline: 'Portfolio intelligence service for creative studios',
    description:
      'REST platform that aggregates project metrics, contact intake, and content publishing with typed schemas and production-ready observability hooks.',
    category: 'API',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
    technologies: ['Node.js', 'Express', 'TypeScript', 'Zod', 'MongoDB'],
    features: [
      'Contact intake with rate limiting',
      'Project catalog endpoints',
      'Schema-first validation',
      'Health and uptime telemetry',
    ],
    githubUrl: 'https://github.com/alexrivera/nova-folio-api',
    featured: true,
  },
  {
    id: 'atelier-web',
    title: 'Atelier',
    tagline: 'Immersive brand site for a digital design studio',
    description:
      'Award-inspired marketing experience with scroll storytelling, glass panels, and responsive art direction tuned for desktop theater and mobile clarity.',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d224b85b12?auto=format&fit=crop&w=1400&q=80',
    technologies: ['React', 'TypeScript', 'CSS', 'Framer-inspired motion'],
    features: [
      'Narrative scroll sections',
      'Case study galleries',
      'Keyboard-accessible navigation',
      'SEO-ready metadata layer',
    ],
    liveUrl: 'https://example.com/atelier',
    githubUrl: 'https://github.com/alexrivera/atelier',
  },
  {
    id: 'pulse-kit',
    title: 'Pulse Kit',
    tagline: 'Component kit for futuristic SaaS dashboards',
    description:
      'A reusable glass UI kit with buttons, modals, badges, and charts designed for high-density product interfaces without sacrificing softness.',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80',
    technologies: ['React', 'React Native', 'TypeScript', 'Storybook-style docs'],
    features: [
      'Tokenized light/dark themes',
      'Glass primitives library',
      'Motion presets with reduced-motion support',
      'Cross-platform visual parity',
    ],
    liveUrl: 'https://example.com/pulse-kit',
    githubUrl: 'https://github.com/alexrivera/pulse-kit',
  },
  {
    id: 'harbor-notes',
    title: 'Harbor Notes',
    tagline: 'Calm cross-platform notes with sync-ready architecture',
    description:
      'A focused writing app built with Expo Router, soft glass surfaces, and a Node sync service that keeps drafts coherent across devices.',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80',
    technologies: ['Expo Router', 'AsyncStorage', 'Node.js', 'REST'],
    features: [
      'Local-first draft drafting',
      'Tag-based organization',
      'Soft ambient theme transitions',
      'Export-ready markdown pipeline',
    ],
    liveUrl: 'https://example.com/harbor-notes',
    githubUrl: 'https://github.com/alexrivera/harbor-notes',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'aurora',
    type: 'work',
    title: 'Senior Full Stack Developer',
    organization: 'Aurora Labs',
    location: 'Remote',
    period: '2023 — Present',
    description:
      'Leading product engineering for multi-platform creative tools with a shared design system and resilient API layer.',
    highlights: [
      'Shipped Expo + web experiences used by 40k monthly creators',
      'Built a typed Express platform with Zod validation and observability',
      'Mentored engineers on interaction design and performance budgets',
    ],
  },
  {
    id: 'northwind',
    type: 'work',
    title: 'Full Stack Engineer',
    organization: 'Northwind Digital',
    location: 'San Francisco, CA',
    period: '2021 — 2023',
    description:
      'Delivered SaaS dashboards and customer portals with glass UI systems, realtime insights, and modular Node services.',
    highlights: [
      'Reduced dashboard load time by 38% through rendering strategy upgrades',
      'Introduced design tokens shared between React and React Native',
      'Owned contact and onboarding APIs end to end',
    ],
  },
  {
    id: 'pixelcraft',
    type: 'internship',
    title: 'Product Engineering Intern',
    organization: 'Pixelcraft Studio',
    location: 'New York, NY',
    period: '2020',
    description:
      'Supported brand sites and internal tooling while learning production shipping rituals and accessible interface patterns.',
    highlights: [
      'Prototyped interactive case-study layouts',
      'Improved form validation UX across marketing funnels',
    ],
  },
  {
    id: 'state-u',
    type: 'education',
    title: 'B.S. in Computer Science',
    organization: 'State University',
    location: 'United States',
    period: '2016 — 2020',
    description:
      'Focused on human-computer interaction, distributed systems, and software engineering practice.',
    highlights: [
      'Capstone: cross-platform study companion with offline sync',
      'Teaching assistant for web development fundamentals',
    ],
  },
  {
    id: 'meta-cert',
    type: 'certification',
    title: 'Meta Front-End Developer Certificate',
    organization: 'Coursera · Meta',
    location: 'Online',
    period: '2022',
    description:
      'Advanced React patterns, accessibility, and production UI engineering.',
    highlights: ['Capstone interface scored distinction for interaction quality'],
  },
  {
    id: 'awwwards-nod',
    type: 'achievement',
    title: 'Studio Site Featured in Design Roundups',
    organization: 'Independent work',
    location: 'Remote',
    period: '2024',
    description:
      'Recognized for immersive glassmorphism storytelling and refined motion systems on client launches.',
    highlights: ['Multiple client sites cited for visual polish and accessibility'],
  },
];

export const TECH_BADGES = [
  'TypeScript',
  'React Native',
  'Expo',
  'Node.js',
  'MongoDB',
  'Reanimated',
];
