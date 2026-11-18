import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { radii, spacing, typography } from '../../theme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlassSurface } from './GlassSurface';

type Variant = 'primary' | 'secondary' | 'ghost';

type GlassButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function GlassButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: GlassButtonProps) {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const [hovered, setHovered] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.colors.text} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              {
                color:
                  variant === 'primary'
                    ? '#FFFFFF'
                    : variant === 'ghost'
                      ? theme.colors.textSecondary
                      : theme.colors.text,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      disabled={disabled || loading}
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => {
        if (!reducedMotion) scale.value = withSpring(0.97, { damping: 18, stiffness: 280 });
      }}
      onPressOut={() => {
        if (!reducedMotion) scale.value = withSpring(1, { damping: 16, stiffness: 220 });
      }}
      style={[animatedStyle, style, (disabled || loading) && styles.disabled]}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={[...theme.gradients.button]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.base,
            theme.shadows.glow,
            hovered && { opacity: 0.94 },
          ]}
        >
          {content}
        </LinearGradient>
      ) : variant === 'secondary' ? (
        <GlassSurface
          intensity={24}
          radius={radii.pill}
          strong
          style={[styles.base, hovered && { borderColor: theme.colors.accentSecondary }]}
          contentStyle={styles.inner}
        >
          {content}
        </GlassSurface>
      ) : (
        <View
          style={[
            styles.base,
            styles.ghost,
            { borderColor: theme.colors.glassBorder },
            hovered && { backgroundColor: theme.colors.glass },
          ]}
        >
          {content}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  ghost: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    ...typography.button,
  },
  disabled: {
    opacity: 0.55,
  },
});
