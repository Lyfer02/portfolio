import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ABOUT, SITE } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import type { NavSection } from '../../types';
import { FadeIn } from '../animations/FadeIn';
import { GlassCard } from '../glass';
import { Section } from '../ui/Section';

type Props = {
  onLayout: (id: NavSection, event: any) => void;
};

export function AboutSection({ onLayout }: Props) {
  const { theme } = useTheme();
  const { isDesktop } = useResponsive();

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Designed for clarity. Engineered for wonder."
      description="A builder who treats interfaces like products and products like lasting systems."
      onLayout={(event) => onLayout('about', event)}
    >
      <View style={[styles.grid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
        <FadeIn style={styles.profileCol}>
          <GlassCard glow strong contentStyle={styles.profileCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
              }}
              style={styles.image}
              accessibilityLabel={`${SITE.name} portrait`}
            />
            <Text style={[styles.name, { color: theme.colors.text }]}>{SITE.name}</Text>
            <Text style={{ color: theme.colors.textSecondary }}>{SITE.role}</Text>
            <Text style={{ color: theme.colors.textMuted }}>{SITE.location}</Text>
          </GlassCard>
        </FadeIn>

        <View style={styles.copyCol}>
          <FadeIn delay={80}>
            <GlassCard>
              <Text style={[styles.blockTitle, { color: theme.colors.text }]}>Introduction</Text>
              <Text style={[styles.body, { color: theme.colors.textSecondary }]}>{ABOUT.intro}</Text>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={140}>
            <GlassCard>
              <Text style={[styles.blockTitle, { color: theme.colors.text }]}>Journey</Text>
              <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
                {ABOUT.journey}
              </Text>
            </GlassCard>
          </FadeIn>
          <View style={[styles.twoCol, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            <FadeIn delay={180} style={styles.flex}>
              <GlassCard>
                <Text style={[styles.blockTitle, { color: theme.colors.text }]}>Passion</Text>
                <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
                  {ABOUT.passion}
                </Text>
              </GlassCard>
            </FadeIn>
            <FadeIn delay={220} style={styles.flex}>
              <GlassCard>
                <Text style={[styles.blockTitle, { color: theme.colors.text }]}>Goals</Text>
                <Text style={[styles.body, { color: theme.colors.textSecondary }]}>
                  {ABOUT.goals}
                </Text>
              </GlassCard>
            </FadeIn>
          </View>
        </View>
      </View>

      <View style={styles.stats}>
        {ABOUT.stats.map((stat, index) => (
          <FadeIn key={stat.label} delay={80 + index * 60} style={styles.statItem}>
            <GlassCard contentStyle={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.colors.accentSecondary }]}>
                {stat.value}
              </Text>
              <Text style={{ color: theme.colors.textSecondary }}>{stat.label}</Text>
            </GlassCard>
          </FadeIn>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.lg,
  },
  profileCol: {
    width: '100%',
    maxWidth: 320,
  },
  profileCard: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
  },
  copyCol: {
    flex: 1,
    gap: spacing.md,
  },
  twoCol: {
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  blockTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
  },
  stats: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statItem: {
    flexGrow: 1,
    minWidth: 140,
  },
  statCard: {
    alignItems: 'flex-start',
    gap: 4,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
  },
});
