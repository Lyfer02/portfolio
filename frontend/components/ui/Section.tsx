import React from 'react';
import { StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { spacing, typography } from '../../theme';
import type { NavSection } from '../../types';
import { FadeIn } from '../animations/FadeIn';

type SectionProps = {
  id: NavSection;
  eyebrow?: string;
  title: string;
  description?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  onLayout,
  children,
}: SectionProps) {
  const { theme } = useTheme();
  const { contentMaxWidth, horizontalPadding, isMobile } = useResponsive();

  return (
    <View
      nativeID={id}
      accessibilityLabel={`${title} section`}
      onLayout={onLayout}
      style={[
        styles.section,
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: isMobile ? spacing.xxl : spacing.section,
        },
      ]}
    >
      <View style={{ width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }}>
        <FadeIn>
          <View style={styles.header}>
            {eyebrow ? (
              <Text style={[styles.eyebrow, { color: theme.colors.accentSecondary }]}>
                {eyebrow}
              </Text>
            ) : null}
            <Text style={[styles.title, { color: theme.colors.text, fontSize: isMobile ? 30 : 36 }]}>
              {title}
            </Text>
            {description ? (
              <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
                {description}
              </Text>
            ) : null}
          </View>
        </FadeIn>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  header: {
    marginBottom: spacing.xl,
    gap: spacing.sm,
    maxWidth: 720,
  },
  eyebrow: {
    ...typography.label,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h2,
  },
  description: {
    ...typography.bodyLarge,
  },
});
