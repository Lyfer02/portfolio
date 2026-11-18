import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function HeroOrb() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const spin = useSharedValue(0);

  useEffect(() => {
    if (reduced) return;
    spin.value = withRepeat(
      withTiming(1, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
  }, [reduced, spin]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }, { scale: 1.02 }],
  }));

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Animated.View style={[styles.orb, animatedStyle]}>
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentSecondary, theme.colors.accentTertiary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View style={[styles.ring, { borderColor: theme.colors.glassBorder }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    width: 210,
    height: 210,
    borderRadius: 999,
    overflow: 'hidden',
    opacity: 0.9,
  },
  ring: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 999,
    borderWidth: 1,
  },
});
