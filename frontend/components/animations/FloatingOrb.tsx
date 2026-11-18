import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type FloatingOrbProps = {
  colors: readonly [string, string];
  size?: number;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

export function FloatingOrb({
  colors,
  size = 220,
  style,
  duration = 9000,
}: FloatingOrbProps) {
  const reduced = useReducedMotion();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (reduced) return;
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [duration, progress, reduced]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: reduced ? 0 : progress.value * 18 - 9 },
      { translateX: reduced ? 0 : progress.value * 12 - 6 },
      { scale: reduced ? 1 : 0.96 + progress.value * 0.08 },
    ],
    opacity: 0.75,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.orb,
        { width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
        style,
      ]}
    >
      <LinearGradient
        colors={[...colors]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    overflow: 'hidden',
  },
});
