import * as WebBrowser from 'expo-web-browser';
import { ExternalLink } from 'lucide-react-native';
import { GithubIcon } from '../ui/SocialIcons';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PROJECTS } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import type { NavSection, Project, ProjectCategory } from '../../types';
import { isWeb } from '../../utils/platform';
import { FadeIn } from '../animations/FadeIn';
import { GlassBadge, GlassButton, GlassCard, GlassModal } from '../glass';
import { Section } from '../ui/Section';

type Props = {
  onLayout: (id: NavSection, event: any) => void;
};

const CATEGORIES: ProjectCategory[] = ['All', 'Full Stack', 'Mobile', 'Web', 'API'];

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.cardWrap, isWeb ? animatedStyle : null]}>
      <Pressable
        onHoverIn={() => {
          if (!isWeb || reduced) return;
          rotateX.value = withSpring(-4, { damping: 18, stiffness: 180 });
          rotateY.value = withSpring(5, { damping: 18, stiffness: 180 });
        }}
        onHoverOut={() => {
          rotateX.value = withSpring(0);
          rotateY.value = withSpring(0);
        }}
        onPress={() => onOpen(project)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${project.title} details`}
      >
        <GlassCard padded={false} style={styles.card} contentStyle={styles.cardInner}>
          <Image
            source={{ uri: project.image }}
            style={styles.thumbnail}
            accessibilityLabel={`${project.title} preview`}
          />
          <View style={styles.cardBody}>
            <View style={styles.metaRow}>
              <GlassBadge label={project.category} tone="accent" />
              {project.featured ? <GlassBadge label="Featured" /> : null}
            </View>
            <Text style={[styles.title, { color: theme.colors.text }]}>{project.title}</Text>
            <Text style={{ color: theme.colors.textSecondary, ...typography.body }}>
              {project.tagline}
            </Text>
            <View style={styles.techRow}>
              {project.technologies.slice(0, 4).map((tech) => (
                <View
                  key={tech}
                  style={[styles.techChip, { borderColor: theme.colors.glassBorder }]}
                >
                  <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{tech}</Text>
                </View>
              ))}
            </View>
            <View style={styles.actions}>
              <GlassButton label="View project" onPress={() => onOpen(project)} />
              {project.githubUrl ? (
                <GlassButton
                  label="Source"
                  variant="ghost"
                  icon={<GithubIcon size={15} color={theme.colors.textSecondary} />}
                  onPress={() => WebBrowser.openBrowserAsync(project.githubUrl!)}
                />
              ) : null}
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export function ProjectsSection({ onLayout }: Props) {
  const { theme } = useTheme();
  const { isDesktop } = useResponsive();
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      category === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === category),
    [category]
  );

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work with premium presence"
      description="Featured builds spanning immersive interfaces, mobile products, and typed API platforms."
      onLayout={(event) => onLayout('projects', event)}
    >
      <View style={styles.filters}>
        {CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
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

      <View style={[styles.grid, !isDesktop && styles.gridMobile]}>
        {filtered.map((project, index) => (
          <FadeIn key={project.id} delay={index * 50} style={styles.gridItem}>
            <ProjectCard project={project} onOpen={setSelected} />
          </FadeIn>
        ))}
      </View>

      <GlassModal
        visible={!!selected}
        title={selected?.title || 'Project'}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <>
            <Image
              source={{ uri: selected.image }}
              style={styles.modalImage}
              accessibilityLabel={`${selected.title} screenshot`}
            />
            <Text style={{ color: theme.colors.textSecondary, ...typography.bodyLarge }}>
              {selected.description}
            </Text>
            <Text style={[styles.modalHeading, { color: theme.colors.text }]}>Features</Text>
            {selected.features.map((feature) => (
              <Text key={feature} style={{ color: theme.colors.textSecondary }}>
                • {feature}
              </Text>
            ))}
            <Text style={[styles.modalHeading, { color: theme.colors.text }]}>Technologies</Text>
            <View style={styles.techRow}>
              {selected.technologies.map((tech) => (
                <GlassBadge key={tech} label={tech} />
              ))}
            </View>
            <View style={styles.actions}>
              {selected.liveUrl ? (
                <GlassButton
                  label="Live demo"
                  icon={<ExternalLink size={15} color="#fff" />}
                  onPress={() => WebBrowser.openBrowserAsync(selected.liveUrl!)}
                />
              ) : null}
              {selected.githubUrl ? (
                <GlassButton
                  label="Source code"
                  variant="secondary"
                  icon={<GithubIcon size={15} color={theme.colors.text} />}
                  onPress={() => WebBrowser.openBrowserAsync(selected.githubUrl!)}
                />
              ) : null}
            </View>
          </>
        ) : null}
      </GlassModal>
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
    gap: spacing.lg,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  gridItem: {
    flexBasis: 340,
    flexGrow: 1,
    maxWidth: '100%',
  },
  cardWrap: {
    width: '100%',
  },
  card: {
    overflow: 'hidden',
  },
  cardInner: {
    gap: 0,
  },
  thumbnail: {
    width: '100%',
    height: 190,
  },
  cardBody: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techChip: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalImage: {
    width: '100%',
    height: 220,
    borderRadius: radii.lg,
  },
  modalHeading: {
    ...typography.h3,
    marginTop: spacing.sm,
  },
});
