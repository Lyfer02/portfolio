import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mode = 'system' | 'light' | 'dark';
const dark = { bg: '#05060f', text: '#f5f6ff', sub: '#a3a9cc', glass: 'rgba(255,255,255,0.06)', glassSolid: 'rgba(22,24,46,0.94)', border: 'rgba(255,255,255,0.15)', a1: '#8b5cf6', a2: '#22d3ee', a3: '#3b82f6', orbs: ['#7c3aed', '#06b6d4', '#2563eb'], shadow: '#7c3aed', tint: 'dark' as 'dark' | 'light' };
const light: typeof dark = { bg: '#f5f6fb', text: '#12142b', sub: '#565c7a', glass: 'rgba(255,255,255,0.62)', glassSolid: 'rgba(255,255,255,0.97)', border: 'rgba(90,100,180,0.2)', a1: '#6d5ef0', a2: '#0ea5e9', a3: '#818cf8', orbs: ['#c4b5fd', '#93c5fd', '#f0abfc'], shadow: '#6366f1', tint: 'light' };
export type Theme = typeof dark;
export const FONT = { fontFamily: 'Inter, "SF Pro Display", -apple-system, "Segoe UI", system-ui, sans-serif' } as const;

const Ctx = createContext<{ t: Theme; mode: Mode; isDark: boolean; setMode: (m: Mode) => void }>(null as any);
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sys = useColorScheme();
  const [mode, setModeState] = useState<Mode>('system');
  useEffect(() => { AsyncStorage.getItem('theme-mode').then(v => v && setModeState(v as Mode)).catch(() => {}); }, []);
  const setMode = (m: Mode) => { setModeState(m); AsyncStorage.setItem('theme-mode', m).catch(() => {}); };
  const isDark = mode === 'system' ? sys !== 'light' : mode === 'dark';
  const value = useMemo(() => ({ t: isDark ? dark : light, mode, isDark, setMode }), [isDark, mode]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
