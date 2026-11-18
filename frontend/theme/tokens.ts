export type ThemeMode = 'light' | 'dark';

export type ThemeTokens = {
  mode: ThemeMode;
  colors: {
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceElevated: string;
    glass: string;
    glassStrong: string;
    glassBorder: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentSecondary: string;
    accentTertiary: string;
    success: string;
    danger: string;
    glow: string;
    overlay: string;
    navbar: string;
    timeline: string;
    input: string;
    inputBorder: string;
  };
  gradients: {
    hero: readonly [string, string, string];
    accent: readonly [string, string];
    button: readonly [string, string];
    orbA: readonly [string, string];
    orbB: readonly [string, string];
    text: readonly [string, string, string];
  };
  shadows: {
    soft: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    glow: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
};

export const darkTheme: ThemeTokens = {
  mode: 'dark',
  colors: {
    background: '#05070F',
    backgroundSecondary: '#0A1020',
    surface: 'rgba(16, 22, 40, 0.72)',
    surfaceElevated: 'rgba(22, 30, 54, 0.85)',
    glass: 'rgba(255, 255, 255, 0.06)',
    glassStrong: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.14)',
    text: '#F4F7FF',
    textSecondary: '#B7C2DA',
    textMuted: '#7F8BA8',
    accent: '#7C6CFF',
    accentSecondary: '#22D3EE',
    accentTertiary: '#A78BFA',
    success: '#34D399',
    danger: '#FB7185',
    glow: 'rgba(124, 108, 255, 0.45)',
    overlay: 'rgba(2, 4, 12, 0.72)',
    navbar: 'rgba(10, 14, 28, 0.55)',
    timeline: 'rgba(124, 108, 255, 0.55)',
    input: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.12)',
  },
  gradients: {
    hero: ['#05070F', '#0B1224', '#12103A'] as const,
    accent: ['#7C6CFF', '#22D3EE'] as const,
    button: ['#7C6CFF', '#5B8CFF'] as const,
    orbA: ['rgba(124,108,255,0.55)', 'rgba(34,211,238,0.18)'] as const,
    orbB: ['rgba(167,139,250,0.4)', 'rgba(56,189,248,0.12)'] as const,
    text: ['#F8FAFF', '#A5B4FC', '#67E8F9'] as const,
  },
  shadows: {
    soft: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.35,
      shadowRadius: 32,
      elevation: 12,
    },
    glow: {
      shadowColor: '#7C6CFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.45,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};

export const lightTheme: ThemeTokens = {
  mode: 'light',
  colors: {
    background: '#F3F6FB',
    backgroundSecondary: '#EAF0F8',
    surface: 'rgba(255, 255, 255, 0.72)',
    surfaceElevated: 'rgba(255, 255, 255, 0.88)',
    glass: 'rgba(255, 255, 255, 0.55)',
    glassStrong: 'rgba(255, 255, 255, 0.78)',
    glassBorder: 'rgba(90, 110, 150, 0.16)',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    accent: '#5B6CFF',
    accentSecondary: '#0EA5E9',
    accentTertiary: '#8B5CF6',
    success: '#059669',
    danger: '#E11D48',
    glow: 'rgba(91, 108, 255, 0.28)',
    overlay: 'rgba(15, 23, 42, 0.4)',
    navbar: 'rgba(255, 255, 255, 0.62)',
    timeline: 'rgba(91, 108, 255, 0.45)',
    input: 'rgba(255, 255, 255, 0.8)',
    inputBorder: 'rgba(100, 116, 139, 0.22)',
  },
  gradients: {
    hero: ['#F3F6FB', '#E8EEF8', '#EDE7FF'] as const,
    accent: ['#5B6CFF', '#38BDF8'] as const,
    button: ['#5B6CFF', '#7C3AED'] as const,
    orbA: ['rgba(91,108,255,0.28)', 'rgba(56,189,248,0.16)'] as const,
    orbB: ['rgba(139,92,246,0.22)', 'rgba(14,165,233,0.12)'] as const,
    text: ['#0F172A', '#4F46E5', '#0284C7'] as const,
  },
  shadows: {
    soft: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.16,
      shadowRadius: 28,
      elevation: 8,
    },
    glow: {
      shadowColor: '#5B6CFF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 20,
      elevation: 6,
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  section: 96,
} as const;

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -1.6,
  },
  h1: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 42,
    lineHeight: 50,
    letterSpacing: -1,
  },
  h2: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.6,
  },
  h3: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  body: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 26,
  },
  bodyLarge: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 18,
    lineHeight: 30,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.4,
  },
  button: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
} as const;
