# Alex Rivera · Ultra-Premium Glassmorphism Portfolio

Award-inspired personal developer portfolio built with **React Native**, **Expo**, **Expo Router**, **Expo Web**, and a **Node.js / Express** contact API.

The experience combines Apple-like minimalism, futuristic glassmorphism, animated gradients, and polished light/dark themes.

## Project structure

```text
portfolio/
├── frontend/          # Expo + React Native + Expo Web
├── backend/           # Express + Zod REST API
└── README.md
```

## Features

- Floating frosted-glass navbar with active section tracking
- Immersive hero with gradient typography, role typewriter, floating orbs, and glass profile frame
- About, Skills, Projects, Experience, and Contact sections
- Interactive skill and project filters
- Project detail modal with links
- Animated sun/moon/system theme toggle with AsyncStorage persistence
- Reduced-motion aware animations
- Web blur fallbacks via CSS `backdrop-filter`
- Contact form wired to `POST /api/contact`
- Health endpoint at `GET /api/health`

## Prerequisites

- Node.js 20+
- npm 10+

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API defaults to `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run web
```

Expo Web usually opens on `http://localhost:8081`.

### Mobile

```bash
cd frontend
npm start
```

Then press `i` / `a`, or scan the QR code with Expo Go.

## Environment

### Backend (`backend/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGIN` | Comma-separated allowed origins |
| `CONTACT_TO_EMAIL` | Destination logged for contact messages |
| `RATE_LIMIT_WINDOW_MS` | Rate-limit window |
| `RATE_LIMIT_MAX` | Max requests per window / IP |

### Frontend (`frontend/.env`)

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | Contact API base, e.g. `http://localhost:4000/api` |

## API

### `GET /api/health`

Returns service status.

### `POST /api/contact`

Body:

```json
{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "subject": "Product collaboration",
  "message": "We would love to discuss a full-stack engagement."
}
```

Validated with Zod. Messages are stored in-memory for local demos and logged to the console. Wire `contactService` to Resend/SendGrid/SES for production email delivery.

## Customization guide

1. Edit `frontend/constants/content.ts` for name, roles, about copy, skills, projects, experience, and socials.
2. Adjust design tokens in `frontend/theme/tokens.ts`.
3. Swap portrait images in `HeroSection` and `AboutSection`.
4. Update resume URL (`SITE.resumeUrl`).
5. Point `EXPO_PUBLIC_API_URL` at your deployed API.

## Design system

Reusable glass primitives live in `frontend/components/glass/`:

- `GlassSurface`
- `GlassCard`
- `GlassButton`
- `GlassBadge`
- `GlassModal`
- `GlassNavbar`

Theme system:

- `ThemeProvider` / `useTheme`
- Preferences: `light` | `dark` | `system`
- Persisted with AsyncStorage

## Scripts

### Frontend

- `npm start` — Expo dev server
- `npm run web` — Expo Web
- `npm run android` / `npm run ios`
- `npm run typecheck`

### Backend

- `npm run dev` — TypeScript watcher
- `npm run build`
- `npm start`
- `npm run typecheck`

## Notes on glass / blur

- Native platforms use `expo-blur`.
- Web uses translucent fills plus CSS `backdrop-filter` fallbacks.
- 3D-like hero orb uses a dedicated `.web` implementation for browser polish and a lighter native counterpart.

## License

Private demo portfolio scaffold. Replace sample content with your own before publishing.
