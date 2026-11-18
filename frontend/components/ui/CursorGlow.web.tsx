import React, { useEffect, useState } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';

export function CursorGlow() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const { isDesktop } = useResponsive();
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (!isDesktop || reduced || typeof window === 'undefined') return;

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  const glowStyle = {
    left: pos.x - 140,
    top: pos.y - 140,
    background: `radial-gradient(circle, ${theme.colors.glow} 0%, transparent 70%)`,
    position: 'fixed',
  } as unknown as ViewStyle;

  return <View pointerEvents="none" style={[styles.glow, glowStyle]} />;
}

const styles = StyleSheet.create({
  glow: {
    width: 280,
    height: 280,
    zIndex: 5,
    opacity: 0.35,
  },
});
