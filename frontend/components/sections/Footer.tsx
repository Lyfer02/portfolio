import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SITE } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { spacing, typography } from '../../theme';

export function Footer() {
  const { theme } = useTheme();
  const { horizontalPadding, contentMaxWidth } = useResponsive();
  const year = new Date().getFullYear();

  return (
    <View
      style={[
        styles.footer,
        {
          paddingHorizontal: horizontalPadding,
          borderTopColor: theme.colors.glassBorder,
        },
      ]}
    >
      <View style={[styles.inner, { maxWidth: contentMaxWidth }]}>
        <Text style={[styles.brand, { color: theme.colors.text }]}>{SITE.name}</Text>
        <Text style={{ color: theme.colors.textMuted, ...typography.body }}>
          © {year} · Crafted with Expo, glassmorphism, and obsessive detail.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingVertical: spacing.xl,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
    gap: spacing.sm,
  },
  brand: {
    ...typography.h3,
  },
});
