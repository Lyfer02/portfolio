import React, { useState } from 'react';
import { Linking, Modal, Platform, Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassBadge, GlassButton, GlassCard } from '../glass/Glass';
import { FONT, useTheme } from '../../theme/theme';
import { PROFILE } from './Hero';

export function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  const { t } = useTheme();
  return (
    <View style={{ paddingVertical: 80, paddingHorizontal: 24, maxWidth: 1240, width: '100%', alignSelf: 'center' }}>
      <Text accessibilityRole="header" style={[FONT, { color: t.text, fontSize: 44, fontWeight: '800', letterSpacing: -1.5 }]}>{title}</Text>
      {sub && <Text style={[FONT, { color: t.sub, fontSize: 17, marginTop: 8, marginBottom: 32, maxWidth: 560 }]}>{sub}</Text>}
      {children}
    </View>
  );
}
const H = ({ children }: any) => { const { t } = useTheme(); return <Text style={[FONT, { color: t.text, fontSize: 20, fontWeight: '700', marginBottom: 6 }]}>{children}</Text>; };
const P = ({ children }: any) => { const { t } = useTheme(); return <Text style={[FONT, { color: t.sub, fontSize: 15, lineHeight: 24 }]}>{children}</Text>; };

export function About() {
  const { t } = useTheme(); const wide = useWindowDimensions().width > 800;
  const stats = [['24+', 'Projects shipped'], ['3 yrs', 'Building professionally'], ['15', 'Technologies used']];
  return (
    <Section title="About" sub="Self-taught, product-minded, and happiest where design meets code.">
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 20 }}>
        <GlassCard style={{ flex: 1.4, padding: 28 }}>
          <H>From curiosity to craft</H>
          <P>I started by modding game UIs, then moved into JavaScript, and now build full stack products used by thousands. I care about the small things: the easing on a button, the shape of an error message, the response time of an endpoint.</P>
          <View style={{ height: 14 }} /><H>What's next</H>
          <P>I'm looking for a team where I can own features from design to deployment, and keep growing in performance engineering and 3D on the web.</P>
        </GlassCard>
        <View style={{ flex: 1, gap: 16 }}>
          {stats.map(([n, l]) => (
            <GlassCard key={l} style={{ padding: 22 }}>
              <Text style={[FONT, { color: t.a2, fontSize: 36, fontWeight: '800' }]}>{n}</Text><P>{l}</P>
            </GlassCard>))}
        </View>
      </View>
    </Section>
  );
}

const SKILLS: Record<string, string[]> = {
  Frontend: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  Mobile: ['React Native', 'Expo'],
  Tools: ['Git', 'GitHub'],
};
export function Chips({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  const { t } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
      {items.map(c => (
        <Pressable key={c} accessibilityRole="button" accessibilityState={{ selected: c === value }} onPress={() => onChange(c)}
          style={{ paddingHorizontal: 18, paddingVertical: 9, borderRadius: 99, borderWidth: 1, borderColor: c === value ? t.a1 : t.border, backgroundColor: c === value ? t.a1 + '33' : t.glass }}>
          <Text style={[FONT, { color: t.text, fontWeight: '600' }]}>{c}</Text>
        </Pressable>))}
    </View>
  );
}
export function Skills() {
  const { t } = useTheme(); const [cat, setCat] = useState('All');
  const list = Object.entries(SKILLS).flatMap(([c, s]) => s.map(n => ({ n, c }))).filter(s => cat === 'All' || s.c === cat);
  return (
    <Section title="Skills" sub="The tools I reach for, grouped by where they live in the stack.">
      <Chips items={['All', ...Object.keys(SKILLS)]} value={cat} onChange={setCat} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
        {list.map(s => (
          <GlassCard key={s.n} radius={22} style={{ paddingHorizontal: 22, paddingVertical: 18, minWidth: 150 }}>
            <Text style={[FONT, { color: t.text, fontWeight: '700', fontSize: 16 }]}>{s.n}</Text>
            <Text style={[FONT, { color: t.sub, fontSize: 12, marginTop: 2 }]}>{s.c}</Text>
          </GlassCard>))}
      </View>
    </Section>
  );
}

const PROJECTS = [
  { id: 1, title: 'Pulse', cat: 'Mobile', blurb: 'Habit tracker with streak analytics and offline sync.', long: 'A cross-platform habit app with local-first storage, background sync, and weekly insight charts.', feats: ['Offline-first sync', 'Streak analytics', 'Push reminders'], tech: ['React Native', 'Expo', 'Node.js'], colors: ['#7c3aed', '#22d3ee'] },
  { id: 2, title: 'Atlas Dashboard', cat: 'Web', blurb: 'Real-time analytics dashboard for logistics teams.', long: 'A live fleet dashboard handling 10k events/min with filterable maps and exportable reports.', feats: ['WebSocket live feed', 'Role-based access', 'CSV export'], tech: ['React', 'TypeScript', 'Express', 'MongoDB'], colors: ['#2563eb', '#a78bfa'] },
  { id: 3, title: 'Relay API', cat: 'Backend', blurb: 'Rate-limited webhook delivery service with retries.', long: 'A small service that queues, signs, and retries webhooks with exponential backoff and a delivery log.', feats: ['Signed payloads', 'Retry with backoff', 'Delivery log UI'], tech: ['Node.js', 'Express', 'REST APIs'], colors: ['#06b6d4', '#3b82f6'] },
  { id: 4, title: 'Lumen Notes', cat: 'Web', blurb: 'Markdown notes with instant search and shareable pages.', long: 'A fast notes app with full-text search, keyboard shortcuts, and one-click public pages.', feats: ['Instant search', 'Keyboard first', 'Public sharing'], tech: ['React', 'TypeScript', 'MongoDB'], colors: ['#c084fc', '#38bdf8'] },
];
export function Projects() {
  const { t } = useTheme(); const [cat, setCat] = useState('All'); const [open, setOpen] = useState<typeof PROJECTS[0] | null>(null);
  const list = PROJECTS.filter(p => cat === 'All' || p.cat === cat);
  return (
    <Section title="Projects" sub="A few things I've built recently. Tap a card for the details.">
      <Chips items={['All', 'Web', 'Mobile', 'Backend']} value={cat} onChange={setCat} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {list.map(p => (
          <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={`Open ${p.title}`} onPress={() => setOpen(p)} style={({ hovered }: any) => ({ flexGrow: 1, flexBasis: 320, transform: [{ translateY: hovered ? -6 : 0 }] })}>
            <GlassCard>
              <LinearGradient colors={p.colors as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 170, justifyContent: 'flex-end', padding: 18 }}>
                <Text style={[FONT, { color: '#fff', fontSize: 34, fontWeight: '800', letterSpacing: -1 }]}>{p.title}</Text>
              </LinearGradient>
              <View style={{ padding: 20, gap: 12 }}>
                <P>{p.blurb}</P>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{p.tech.map(x => <GlassBadge key={x} label={x} />)}</View>
              </View>
            </GlassCard>
          </Pressable>))}
      </View>
      <Modal visible={!!open} transparent animationType="fade" onRequestClose={() => setOpen(null)}>
        <Pressable onPress={() => setOpen(null)} style={{ flex: 1, backgroundColor: 'rgba(3,4,12,0.6)', justifyContent: 'center', padding: 20 }}>
          {open && <Pressable onPress={() => {}} style={{ maxWidth: 560, width: '100%', alignSelf: 'center' }}>
            <GlassCard style={{ padding: 28, backgroundColor: t.glassSolid }}>
              <Text style={[FONT, { color: t.text, fontSize: 30, fontWeight: '800' }]}>{open.title}</Text>
              <View style={{ height: 10 }} /><P>{open.long}</P>
              <View style={{ height: 16 }} /><H>Features</H>
              {open.feats.map(f => <P key={f}>• {f}</P>)}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 16 }}>{open.tech.map(x => <GlassBadge key={x} label={x} />)}</View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                <GlassButton primary label="Live demo" onPress={() => Linking.openURL('https://example.com')} />
                <GlassButton label="Source code" onPress={() => Linking.openURL(PROFILE.github)} />
                <GlassButton label="Close" onPress={() => setOpen(null)} />
              </View>
            </GlassCard>
          </Pressable>}
        </Pressable>
      </Modal>
    </Section>
  );
}

const TIMELINE = [
  ['2024 – Now', 'Full Stack Developer, Northwind Labs', 'Lead the mobile app and its Node.js API; cut cold-start time by 40%.'],
  ['2023', 'Software Engineering Intern, Brightside', 'Built an internal admin panel used daily by the support team.'],
  ['2023', 'AWS Certified Cloud Practitioner', 'Foundational cloud architecture and security.'],
  ['2019 – 2023', 'B.Tech, Computer Science', 'Graduated with distinction; ran the college developer club.'],
];
export function Experience() {
  const { t } = useTheme();
  return (
    <Section title="Experience" sub="Work, learning, and milestones in order.">
      <View style={{ paddingLeft: 28 }}>
        <LinearGradient colors={[t.a1, t.a2, 'transparent']} style={{ position: 'absolute', left: 5, top: 8, bottom: 0, width: 2 }} />
        {TIMELINE.map(([d, h, b]) => (
          <View key={h} style={{ marginBottom: 20 }}>
            <View style={[{ position: 'absolute', left: -28, top: 24, width: 12, height: 12, borderRadius: 6, backgroundColor: t.a2 }, Platform.OS === 'web' ? { boxShadow: `0 0 10px ${t.a2}` } : { shadowColor: t.a2, shadowOpacity: 1, shadowRadius: 10 }]} />
            <GlassCard radius={22} style={{ padding: 22 }}>
              <Text style={[FONT, { color: t.a2, fontWeight: '700', fontSize: 13, marginBottom: 4 }]}>{d}</Text>
              <H>{h}</H><P>{b}</P>
            </GlassCard>
          </View>))}
      </View>
    </Section>
  );
}

const API = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';
export function Contact() {
  const { t } = useTheme();
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle'); const [err, setErr] = useState('');
  const submit = async () => {
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 10) { setState('error'); setErr('Enter your name, a valid email, and a message of at least 10 characters.'); return; }
    setState('loading');
    try {
      const r = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      if (!r.ok) throw new Error((await r.json()).error ?? 'Request failed');
      setState('ok'); setF({ name: '', email: '', subject: '', message: '' });
    } catch (e: any) { setState('error'); setErr(`Message not sent: ${e.message}. Check the API is running, or email ${PROFILE.email}.`); }
  };
  const input = (k: keyof typeof f, label: string, multi?: boolean) => (
    <TextInput accessibilityLabel={label} placeholder={label} placeholderTextColor={t.sub} value={f[k]} multiline={multi} onChangeText={v => setF({ ...f, [k]: v })}
      style={[FONT, { color: t.text, borderWidth: 1, borderColor: t.border, borderRadius: 16, padding: 14, fontSize: 15, backgroundColor: t.glass, minHeight: multi ? 130 : undefined, textAlignVertical: multi ? 'top' : 'auto' } as any]} />);
  return (
    <Section title="Let's work together" sub="Tell me about your project. I reply within two days.">
      <GlassCard style={{ padding: 28, gap: 14, maxWidth: 640 }}>
        {state === 'ok' ? (<View style={{ alignItems: 'center', padding: 24, gap: 8 }}>
          <LinearGradient colors={[t.a1, t.a2]} style={{ width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff', fontSize: 32 }}>✓</Text></LinearGradient>
          <H>Message sent</H><P>Thanks! I'll be in touch soon.</P><GlassButton label="Send another" onPress={() => setState('idle')} /></View>) : (<>
          {input('name', 'Name')}{input('email', 'Email')}{input('subject', 'Subject')}{input('message', 'Message', true)}
          {state === 'error' && <Text accessibilityRole="alert" style={[FONT, { color: '#f87171' }]}>{err}</Text>}
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
            <GlassButton primary disabled={state === 'loading'} label={state === 'loading' ? 'Sending…' : 'Send message'} onPress={submit} />
            <GlassButton label="Email directly" onPress={() => Linking.openURL(`mailto:${PROFILE.email}`)} />
          </View></>)}
      </GlassCard>
      <Text style={[FONT, { color: t.sub, textAlign: 'center', marginTop: 60 }]}>© {new Date().getFullYear()} {PROFILE.name}</Text>
    </Section>
  );
}
