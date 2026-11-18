import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Linking, Platform, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassButton, GlassCard } from '../glass/Glass';
import { FONT, useTheme } from '../../theme/theme';

const ROLES = ['Full Stack Developer', 'React Native Engineer', 'API Architect', 'Interface Tinkerer'];
export const PROFILE = { name: 'Aarav Sharma', email: 'hello@aaravsharma.dev', github: 'https://github.com/', linkedin: 'https://linkedin.com/', resume: 'https://example.com/resume.pdf' };

function useReduced() { const [r, setR] = useState(false); useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setR); }, []); return r; }

function useTyping(words: string[], off: boolean) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    if (off) return;
    const w = words[i]; const d = del ? 35 : n === w.length ? 1400 : 70;
    const id = setTimeout(() => {
      if (!del && n === w.length) setDel(true);
      else if (del && n === 0) { setDel(false); setI((i + 1) % words.length); }
      else setN(n + (del ? -1 : 1));
    }, d);
    return () => clearTimeout(id);
  }, [n, del, i, off]);
  return off ? words[0] : words[i].slice(0, n);
}

export function Hero({ onNav }: { onNav: (id: string) => void }) {
  const { t } = useTheme(); const { width } = useWindowDimensions(); const wide = width > 900; const reduced = useReduced();
  const float = useRef(new Animated.Value(0)).current; const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const nd = Platform.OS !== 'web';
    Animated.timing(enter, { toValue: 1, duration: reduced ? 0 : 1100, easing: Easing.out(Easing.cubic), useNativeDriver: nd }).start();
    if (reduced) return;
    Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: nd }),
      Animated.timing(float, { toValue: 0, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: nd })])).start();
  }, [reduced]);
  const role = useTyping(ROLES, reduced);
  const bob = float.interpolate({ inputRange: [0, 1], outputRange: [-14, 14] });
  const size = wide ? 420 : Math.min(width - 64, 300);
  const fs = wide ? 88 : 48;
  const gradText: any = Platform.OS === 'web' ? { backgroundImage: `linear-gradient(90deg, ${t.a1}, ${t.a2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' } : { color: t.a1 };
  const pill = (txt: string, pos: any) => <GlassCard radius={20} style={{ position: 'absolute', padding: 14, ...pos }}><Text style={[FONT, { color: t.text, fontWeight: '700' }]}>{txt}</Text></GlassCard>;

  return (
    <View style={{ minHeight: 760, paddingTop: 130, paddingHorizontal: 24, flexDirection: wide ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: 48, maxWidth: 1240, alignSelf: 'center', width: '100%' }}>
      <Animated.View style={{ flex: wide ? 1 : undefined, opacity: enter, transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }}>
        <View style={{ alignSelf: 'flex-start', marginBottom: 22 }}>
          <GlassCard radius={99} style={{ paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' }, Platform.OS === 'web' ? { boxShadow: '0 0 8px #34d399' } : { shadowColor: '#34d399', shadowOpacity: 1, shadowRadius: 8 }]} />
            <Text style={[FONT, { color: t.text, fontSize: 13, fontWeight: '600' }]}>Available for opportunities</Text>
          </GlassCard>
        </View>
        <Text accessibilityRole="header" style={[FONT, { color: t.text, fontSize: fs, lineHeight: fs * 1.05, fontWeight: '800', letterSpacing: -3 }]}>Hi, I'm {PROFILE.name.split(' ')[0]}.</Text>
        <Text style={[FONT, gradText, { fontSize: fs, lineHeight: fs * 1.1, fontWeight: '800', letterSpacing: -3, minHeight: fs * 2.2 }]}>{role}<Text style={{ opacity: 0.6 }}>|</Text></Text>
        <Text style={[FONT, { color: t.sub, fontSize: 18, lineHeight: 28, maxWidth: 540, marginTop: 20 }]}>I design and ship polished products end to end: React Native apps, fast web frontends, and the Node.js APIs behind them. Currently building tools that make teams faster.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
          <GlassButton primary label="View projects" onPress={() => onNav('projects')} />
          <GlassButton label="Contact me" onPress={() => onNav('contact')} />
          <GlassButton label="Download resume" onPress={() => Linking.openURL(PROFILE.resume)} />
        </View>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 24 }}>
          {[['GitHub', PROFILE.github], ['LinkedIn', PROFILE.linkedin], ['Email', `mailto:${PROFILE.email}`]].map(([l, u]) => (
            <Text key={l} accessibilityRole="link" onPress={() => Linking.openURL(u)} style={[FONT, { color: t.sub, fontWeight: '600', textDecorationLine: 'underline' }]}>{l}</Text>))}
        </View>
      </Animated.View>

      <Animated.View style={{ width: size, height: size, opacity: enter, transform: [{ translateY: bob }] }} accessibilityElementsHidden>
        <LinearGradient colors={[t.orbs[0], t.orbs[1], t.orbs[2]]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}
          style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: size }, Platform.OS === 'web' ? { boxShadow: `0 0 80px ${t.a1}b3` } : { shadowColor: t.a1, shadowOpacity: 0.7, shadowRadius: 80 }]} />
        <View style={{ position: 'absolute', top: size * 0.08, left: size * 0.16, width: size * 0.38, height: size * 0.22, borderRadius: size, backgroundColor: 'rgba(255,255,255,0.35)', transform: [{ rotate: '-24deg' }] }} />
        {pill('React Native', { right: -10, top: size * 0.18 })}{pill('Node.js', { left: -10, bottom: size * 0.26 })}{pill('TypeScript', { right: size * 0.12, bottom: -6 })}
      </Animated.View>
    </View>
  );
}
