import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { radii } from '../../theme';
import { isWeb } from '../../utils/platform';

type GlassSurfaceProps = ViewProps & {
  intensity?: number;
  radius?: number;
  strong?: boolean;
  glow?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export function GlassSurface({
  intensity = 28,
  radius = radii.lg,
  strong = false,
  glow = false,
  style,
  contentStyle,
  children,
  ...rest
}: GlassSurfaceProps) {
  const { theme, isDark } = useTheme();

  const borderColor = theme.colors.glassBorder;
  const backgroundColor = strong ? theme.colors.glassStrong : theme.colors.glass;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.base,
    {
      borderRadius: radius,
      borderColor,
      backgroundColor: isWeb ? backgroundColor : 'transparent',
      ...(glow ? theme.shadows.glow : theme.shadows.soft),
    },
    isWeb
      ? ({
          backdropFilter: `blur(${Math.max(intensity, 18)}px)`,
          WebkitBackdropFilter: `blur(${Math.max(intensity, 18)}px)`,
        } as unknown as ViewStyle)
      : null,
    style,
  ];

  if (Platform.OS === 'web') {
    return (
      <View style={containerStyle} {...rest}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <View style={[styles.base, { borderRadius: radius, borderColor }, style]} {...rest}>
      <BlurView
        intensity={intensity}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor,
            borderRadius: radius,
          },
        ]}
      />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
