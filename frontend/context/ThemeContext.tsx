import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, Platform } from 'react-native';
import { darkTheme, lightTheme, type ThemeTokens } from '../theme';
import type { ThemePreference } from '../types';

const STORAGE_KEY = 'portfolio.themePreference';

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: 'light' | 'dark';
  theme: ThemeTokens;
  setPreference: (preference: ThemePreference) => void;
  cyclePreference: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemScheme(): 'light' | 'dark' {
  const scheme = Appearance.getColorScheme();
  return scheme === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [systemScheme, setSystemScheme] = useState<'light' | 'dark'>(getSystemScheme);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!mounted) return;
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setPreferenceState(stored);
        }
      })
      .finally(() => {
        if (mounted) setHydrated(true);
      });

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme === 'light' ? 'light' : 'dark');
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, preference).catch(() => undefined);
  }, [preference, hydrated]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const root = document.documentElement;
    const resolved = preference === 'system' ? systemScheme : preference;
    root.style.colorScheme = resolved;
    root.dataset.theme = resolved;
  }, [preference, systemScheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((current) => {
      if (current === 'system') return 'light';
      if (current === 'light') return 'dark';
      return 'system';
    });
  }, []);

  const resolved = preference === 'system' ? systemScheme : preference;
  const theme = resolved === 'dark' ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({
      preference,
      resolved,
      theme,
      setPreference,
      cyclePreference,
      isDark: resolved === 'dark',
    }),
    [preference, resolved, theme, setPreference, cyclePreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
