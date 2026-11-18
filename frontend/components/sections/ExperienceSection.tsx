import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EXPERIENCE } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import type { NavSection } from '../../types';
import { FadeIn } from '../animations/FadeIn';
import { GlassBadge, GlassCard } from '../glass';
import { Section } from '../ui/Section';

type Props = {
  onLayout: (id: NavSection, event: any) => void;
};

const TYPE_LABEL: Record<string, string> = {
  work: 'Work',
  internship: 'Internship',
  education: 'Education',
  certification: 'Certification',
  achievement: 'Achievement',
};

export function ExperienceSection({ onLayout }: Props) {
  const { theme } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of craft, growth, and shipped outcomes"
      description="Roles, education, and milestones that shaped a premium product engineering practice."
      onLayout={(event) => onLayout('experience', event)}
    >
      <View style={styles.timeline}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: theme.colors.timeline,
              left: isMobile ? 10 : 18,
            },
          ]}
        />
        {EXPERIENCE.map((item, index) => (
          <FadeIn key={item.id} delay={index * 70} style={styles.item}>
            <View
              style={[
                styles.node,
                {
                  backgroundColor: theme.colors.accent,
                  shadowColor: theme.colors.accent,
                  left: isMobile ? 2 : 10,
                },
              ]}
            />
            <GlassCard
              style={[styles.card, { marginLeft: isMobile ? 36 : 48 }]}
              contentStyle={styles.cardContent}
            >
              <View style={styles.meta}>
                <GlassBadge label={TYPE_LABEL[item.type]} tone="accent" />
                <Text style={{ color: theme.colors.textMuted, ...typography.label }}>
                  {item.period}
                </Text>
              </View>
              <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={{ color: theme.colors.accentSecondary, ...typography.button }}>
                {item.organization} · {item.location}
              </Text>
              <Text style={{ color: theme.colors.textSecondary, ...typography.body }}>
                {item.description}
              </Text>
              <View style={styles.highlights}>
                {item.highlights.map((highlight) => (
                  <Text key={highlight} style={{ color: theme.colors.textSecondary }}>
                    • {highlight}
                  </Text>
                ))}
              </View>
            </GlassCard>
          </FadeIn>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  timeline: {
    position: 'relative',
    gap: spacing.lg,
  },
  line: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    width: 2,
    borderRadius: radii.pill,
    opacity: 0.7,
  },
  item: {
    position: 'relative',
  },
  node: {
    position: 'absolute',
    top: 28,
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    shadowOpacity: 0.55,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
    zIndex: 2,
  },
  card: {
    width: 'auto',
  },
  cardContent: {
    gap: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
  },
  highlights: {
    gap: 6,
    marginTop: 4,
  },
});
