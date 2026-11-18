import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SKILLS } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { radii, spacing, typography } from '../../theme';
import type { NavSection, SkillCategory } from '../../types';
import { FadeIn } from '../animations/FadeIn';
import { GlassBadge, GlassCard } from '../glass';
import { Section } from '../ui/Section';

type Props = {
  onLayout: (id: NavSection, event: any) => void;
};

const CATEGORIES: Array<'All' | SkillCategory> = [
  'All',
  'Frontend',
  'Backend',
  'Mobile',
  'Tools',
];

export function SkillsSection({ onLayout }: Props) {
  const { theme } = useTheme();
  const [category, setCategory] = useState<'All' | SkillCategory>('All');

  const filtered = useMemo(
    () => (category === 'All' ? SKILLS : SKILLS.filter((skill) => skill.category === category)),
    [category]
  );

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A toolkit tuned for polished products"
      description="Interactive capabilities across frontend, backend, mobile, and delivery tooling — without vanity percentage meters."
      onLayout={(event) => onLayout('skills', event)}
    >
      <View style={styles.filters}>
        {CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setCategory(item)}
              style={[
                styles.filter,
                {
                  borderColor: active ? theme.colors.accent : theme.colors.glassBorder,
                  backgroundColor: active ? theme.colors.glassStrong : theme.colors.glass,
                },
              ]}
            >
              <Text style={{ color: theme.colors.text, ...typography.label }}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        {filtered.map((skill, index) => (
          <FadeIn key={skill.id} delay={index * 40} style={styles.cardWrap}>
            <GlassCard style={styles.card} contentStyle={styles.cardContent}>
              <GlassBadge label={skill.category} tone="accent" />
              <Text style={[styles.name, { color: theme.colors.text }]}>{skill.name}</Text>
              <Text style={{ color: theme.colors.textSecondary, ...typography.body }}>
                {skill.description}
              </Text>
            </GlassCard>
          </FadeIn>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filter: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cardWrap: {
    flexGrow: 1,
    flexBasis: 240,
    maxWidth: '100%',
  },
  card: {
    minHeight: 170,
  },
  cardContent: {
    gap: spacing.sm,
  },
  name: {
    ...typography.h3,
  },
});
