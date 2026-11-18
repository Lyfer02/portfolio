import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { radii, spacing, typography } from '../../theme';
import { GlassSurface } from './GlassSurface';

type GlassBadgeProps = {
  label: string;
  tone?: 'default' | 'accent' | 'success';
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function GlassBadge({
  label,
  tone = 'default',
  icon,
  style,
}: GlassBadgeProps) {
  const { theme } = useTheme();

  const accent =
    tone === 'success'
      ? theme.colors.success
      : tone === 'accent'
        ? theme.colors.accentSecondary
        : theme.colors.textSecondary;

  return (
    <GlassSurface
      intensity={18}
      radius={radii.pill}
      style={[styles.badge, style]}
      contentStyle={styles.content}
    >
      {tone !== 'default' ? (
        <View style={[styles.dot, { backgroundColor: accent }]} />
      ) : null}
      {icon}
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  label: {
    ...typography.label,
    textTransform: 'uppercase',
  },
});
