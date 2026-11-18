import { Monitor, Moon, Sun } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { radii } from '../../theme';

export function ThemeToggle() {
  const { preference, theme, cyclePreference, isDark } = useTheme();
  const reduced = useReducedMotion();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (reduced) return;
    rotation.value = withSequence(
      withTiming(180, { duration: 280 }),
      withTiming(360, { duration: 280 })
    );
    scale.value = withSequence(
      withTiming(0.86, { duration: 140 }),
      withTiming(1, { duration: 180 })
    );
  }, [preference, reduced, rotation, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  const Icon = preference === 'system' ? Monitor : isDark ? Moon : Sun;
  const label =
    preference === 'system'
      ? 'Using system theme'
      : preference === 'dark'
        ? 'Dark theme'
        : 'Light theme';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Theme toggle, ${label}. Tap to change.`}
      onPress={cyclePreference}
      style={[
        styles.button,
        {
          borderColor: theme.colors.glassBorder,
          backgroundColor: theme.colors.glass,
        },
      ]}
    >
      <Animated.View style={animatedStyle}>
        <Icon size={16} color={theme.colors.text} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
