import React, { useRef, useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTheme, FONT } from '../theme/theme';
import { GlassCard } from '../components/glass/Glass';
import { Hero, PROFILE } from '../components/sections/Hero';
import { About, Skills, Projects, Experience, Contact } from '../components/sections/Sections';

const NAV = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export default function App() {
  const { t, isDark, setMode } = useTheme(); const { width, height } = useWindowDimensions();
  const sv = useRef<ScrollView>(null); const ys = useRef<Record<string, number>>({}); const [active, setActive] = useState('home'); const [menu, setMenu] = useState(false);
  const go = (id: string) => { sv.current?.scrollTo({ y: Math.max((ys.current[id] ?? 0) - 90, 0), animated: true }); setMenu(false); };
  const onScroll = (e: any) => { const y = e.nativeEvent.contentOffset.y + 160; setActive([...NAV].reverse().find(id => (ys.current[id] ?? 0) <= y) ?? 'home'); };
  const wrap = (id: string, el: React.ReactNode) => <View key={id} onLayout={e => { ys.current[id] = e.nativeEvent.layout.y; }}>{el}</View>;
  const wide = width > 860;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {[[-0.15, -0.1, 0.7, 0], [0.55, 0.25, 0.6, 1], [0.1, 0.7, 0.55, 2]].map(([x, y, s, i], k) => (
          <View key={k} style={[{ position: 'absolute', left: width * x, top: height * y, width: width * s, height: width * s, borderRadius: width, backgroundColor: t.orbs[i], opacity: isDark ? 0.28 : 0.45 }, Platform.OS === 'web' ? ({ filter: 'blur(90px)' } as any) : { opacity: 0.18 }]} />))}
      </View>

      <ScrollView ref={sv} onScroll={onScroll} scrollEventThrottle={32}>
        {wrap('home', <Hero onNav={go} />)}{wrap('about', <About />)}{wrap('skills', <Skills />)}{wrap('projects', <Projects />)}{wrap('experience', <Experience />)}{wrap('contact', <Contact />)}
      </ScrollView>

      <View style={{ position: 'absolute', top: 16, left: 0, right: 0, alignItems: 'center', zIndex: 50 }}>
        <GlassCard radius={99} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, maxWidth: width - 24 }}>
          <LinearGradient colors={[t.a1, t.a2]} style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}><Text style={[FONT, { color: '#fff', fontWeight: '800' }]}>AS</Text></LinearGradient>
          {wide && NAV.map(id => (
            <Pressable key={id} accessibilityRole="link" onPress={() => go(id)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: active === id ? t.a1 + '40' : 'transparent' }}>
              <Text style={[FONT, { color: active === id ? t.text : t.sub, fontWeight: '600', fontSize: 14 }]}>{cap(id)}</Text>
            </Pressable>))}
          <Pressable accessibilityRole="button" accessibilityLabel="Toggle theme" onPress={() => setMode(isDark ? 'light' : 'dark')} style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: t.border }}>
            <Text style={{ fontSize: 18 }}>{isDark ? '☀️' : '🌙'}</Text></Pressable>
          {wide ? <Pressable accessibilityRole="button" onPress={() => Linking.openURL(PROFILE.resume)} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 99, backgroundColor: t.a1 }}><Text style={[FONT, { color: '#fff', fontWeight: '700', fontSize: 14 }]}>Resume</Text></Pressable>
            : <Pressable accessibilityRole="button" accessibilityLabel="Menu" onPress={() => setMenu(!menu)} style={{ width: 38, height: 38, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: t.text, fontSize: 22 }}>{menu ? '✕' : '☰'}</Text></Pressable>}
        </GlassCard>
        {!wide && menu && <GlassCard radius={24} style={{ marginTop: 10, padding: 10, width: width - 32 }}>
          {NAV.map(id => <Pressable key={id} onPress={() => go(id)} style={{ padding: 14 }}><Text style={[FONT, { color: active === id ? t.a2 : t.text, fontWeight: '700', fontSize: 16 }]}>{cap(id)}</Text></Pressable>)}
        </GlassCard>}
      </View>
    </View>
  );
}
