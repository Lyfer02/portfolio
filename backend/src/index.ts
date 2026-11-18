import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: (process.env.CORS_ORIGIN ?? 'http://localhost:8081').split(',') }));

const Contact = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(10).max(4000),
});

// Minimal per-IP rate limit: 5 messages per 10 minutes.
const hits = new Map<string, number[]>();
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.post('/api/contact', (req, res) => {
  const now = Date.now(); const ip = req.ip ?? 'x';
  const recent = (hits.get(ip) ?? []).filter(ts => now - ts < 600_000);
  if (recent.length >= 5) return res.status(429).json({ error: 'Too many messages. Try again later.' });
  const parsed = Contact.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') });
  hits.set(ip, [...recent, now]);
  console.log('New contact message:', parsed.data); // swap for Nodemailer / MongoDB here
  res.status(201).json({ ok: true });
});
app.listen(Number(process.env.PORT ?? 4000), () => console.log('API on :' + (process.env.PORT ?? 4000)));
