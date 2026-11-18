import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { radii, spacing } from '../../theme';
import { GlassSurface } from './GlassSurface';

type GlassCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  glow?: boolean;
  strong?: boolean;
  padded?: boolean;
};

export function GlassCard({
  children,
  style,
  contentStyle,
  glow = false,
  strong = false,
  padded = true,
}: GlassCardProps) {
  return (
    <GlassSurface
      strong={strong}
      glow={glow}
      radius={radii.xl}
      style={style}
      contentStyle={[padded ? styles.padded : null, contentStyle]}
    >
      {children}
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  padded: {
    padding: spacing.lg,
  },
});
