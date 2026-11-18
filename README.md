# Glass portfolio (Expo + Express)
## Run
```
cd backend && cp .env.example .env && npm i && npm run dev        # http://localhost:4000
cd frontend && npm i && echo "EXPO_PUBLIC_API_URL=http://localhost:4000" > .env && npx expo start --web
```
## Customize
- Name, links, resume URL: `frontend/components/sections/Hero.tsx` (PROFILE)
- Projects, skills, timeline: `frontend/components/sections/Sections.tsx`
- Colors: `frontend/theme/theme.tsx` (dark / light tokens)
- Contact delivery: `backend/src/index.ts` (add Nodemailer or Mongoose where the console.log is)
