import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { FloatingOrb } from '../animations/FloatingOrb';

export function AmbientBackground() {
  const { theme } = useTheme();

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[...theme.gradients.hero]}
        style={StyleSheet.absoluteFill}
      />
      <FloatingOrb colors={theme.gradients.orbA} size={320} style={styles.orbA} />
      <FloatingOrb
        colors={theme.gradients.orbB}
        size={260}
        duration={12000}
        style={styles.orbB}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orbA: {
    top: '28%',
    right: -80,
    opacity: 0.55,
  },
  orbB: {
    top: '62%',
    left: -90,
    opacity: 0.45,
  },
});
