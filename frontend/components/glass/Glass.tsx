import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, FONT } from '../../theme/theme';

// Web: CSS backdrop-filter, with an opaque fallback when unsupported. Native: expo-blur.
const webBlur = Platform.OS === 'web' && typeof CSS !== 'undefined' && !!CSS.supports &&
  (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));

export function GlassCard({ children, style, radius = 28 }: { children?: React.ReactNode; style?: StyleProp<ViewStyle>; radius?: number }) {
  const { t } = useTheme();
  const shadow: ViewStyle = Platform.OS === 'web'
    ? { boxShadow: `0 14px 32px ${t.shadow}38` }
    : { shadowColor: t.shadow, shadowOpacity: 0.22, shadowRadius: 32, shadowOffset: { width: 0, height: 14 } };
  const base: ViewStyle = { borderRadius: radius, borderWidth: 1, borderColor: t.border, overflow: 'hidden', ...shadow };
  if (Platform.OS === 'web') {
    const blur: any = webBlur ? { backdropFilter: 'blur(26px) saturate(170%)', WebkitBackdropFilter: 'blur(26px) saturate(170%)' } : {};
    return <View style={[base, { backgroundColor: webBlur ? t.glass : t.glassSolid }, blur, style]}>{children}</View>;
  }
  return (
    <BlurView intensity={45} tint={t.tint} style={[base, style]}>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none', backgroundColor: t.glass }]} />
      {children}
    </BlurView>
  );
}

export function GlassBadge({ label, tone }: { label: string; tone?: string }) {
  const { t } = useTheme();
  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1, borderColor: tone ?? t.border, backgroundColor: t.glass }}>
      <Text style={[FONT, { color: t.text, fontSize: 12, fontWeight: '600' }]}>{label}</Text>
    </View>
  );
}

export function GlassButton({ label, onPress, primary, disabled }: { label: string; onPress: () => void; primary?: boolean; disabled?: boolean }) {
  const { t } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} disabled={disabled}
      style={({ pressed, hovered }: any) => ({ transform: [{ scale: pressed ? 0.97 : hovered ? 1.04 : 1 }], opacity: disabled ? 0.5 : 1, ...(Platform.OS === 'web' ? ({ transition: 'transform .2s ease', cursor: 'pointer' } as any) : {}) })}>
      {primary ? (
        <LinearGradient colors={[t.a1, t.a3, t.a2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingHorizontal: 24, paddingVertical: 14, borderRadius: 99 }}>
          <Text style={[FONT, { color: '#fff', fontWeight: '700', fontSize: 15 }]}>{label}</Text>
        </LinearGradient>
      ) : (
        <GlassCard radius={99} style={{ paddingHorizontal: 24, paddingVertical: 14 }}>
          <Text style={[FONT, { color: t.text, fontWeight: '600', fontSize: 15 }]}>{label}</Text>
        </GlassCard>
      )}
    </Pressable>
  );
}
