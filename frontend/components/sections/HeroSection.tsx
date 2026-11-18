import * as WebBrowser from 'expo-web-browser';
import { ArrowDownRight, Download, Mail } from 'lucide-react-native';
import React from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SITE, SOCIAL_LINKS, TECH_BADGES } from '../../constants/content';
import { useNavigationSections } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import type { NavSection } from '../../types';
import { FadeIn } from '../animations/FadeIn';
import { FloatingOrb } from '../animations/FloatingOrb';
import { GradientText } from '../animations/GradientText';
import { HeroOrb } from '../animations/HeroOrb';
import { TypewriterRoles } from '../animations/TypewriterRoles';
import { GlassBadge, GlassButton, GlassCard } from '../glass';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

type HeroSectionProps = {
  onLayout: (id: NavSection, event: any) => void;
};

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  mail: Mail,
} as const;

export function HeroSection({ onLayout }: HeroSectionProps) {
  const { theme } = useTheme();
  const { scrollToSection } = useNavigationSections();
  const { isMobile, isDesktop, contentMaxWidth, horizontalPadding } = useResponsive();

  return (
    <View
      onLayout={(event) => onLayout('home', event)}
      style={[
        styles.section,
        {
          paddingHorizontal: horizontalPadding,
          paddingTop: isMobile ? 120 : 148,
          minHeight: isMobile ? 760 : 860,
        },
      ]}
    >
      <LinearGradient
        colors={[...theme.gradients.hero]}
        style={StyleSheet.absoluteFill}
      />
      <FloatingOrb colors={theme.gradients.orbA} size={isMobile ? 180 : 280} style={styles.orbA} />
      <FloatingOrb
        colors={theme.gradients.orbB}
        size={isMobile ? 140 : 220}
        style={styles.orbB}
        duration={11000}
      />

      <View style={[styles.content, { maxWidth: contentMaxWidth }]}>
        <View style={[styles.grid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
          <View style={[styles.copy, { flex: isDesktop ? 1.15 : undefined }]}>
            <FadeIn>
              <GlassBadge label={SITE.availability} tone="success" />
            </FadeIn>
            <FadeIn delay={80}>
              <Text style={[styles.kicker, { color: theme.colors.textMuted }]}>
                Premium product engineering
              </Text>
            </FadeIn>
            <FadeIn delay={140}>
              <GradientText
                textStyle={{
                  ...typography.display,
                  fontSize: isMobile ? 42 : isDesktop ? 68 : 56,
                  lineHeight: isMobile ? 48 : isDesktop ? 74 : 62,
                }}
              >
                {SITE.name}
              </GradientText>
            </FadeIn>
            <FadeIn delay={200}>
              <TypewriterRoles roles={SITE.roles} />
            </FadeIn>
            <FadeIn delay={260}>
              <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
                {SITE.tagline}
              </Text>
            </FadeIn>
            <FadeIn delay={320}>
              <View style={styles.ctaRow}>
                <GlassButton
                  label="View Projects"
                  icon={<ArrowDownRight size={16} color="#fff" />}
                  onPress={() => scrollToSection('projects')}
                />
                <GlassButton
                  label="Contact Me"
                  variant="secondary"
                  onPress={() => scrollToSection('contact')}
                />
                <GlassButton
                  label="Resume"
                  variant="ghost"
                  icon={<Download size={15} color={theme.colors.textSecondary} />}
                  onPress={() => WebBrowser.openBrowserAsync(SITE.resumeUrl)}
                />
              </View>
            </FadeIn>
            <FadeIn delay={380}>
              <View style={styles.socialRow}>
                {SOCIAL_LINKS.map((link) => {
                  const Icon = ICONS[link.icon];
                  return (
                    <Pressable
                      key={link.id}
                      accessibilityRole="link"
                      accessibilityLabel={link.label}
                      onPress={() => Linking.openURL(link.url)}
                      style={[
                        styles.social,
                        {
                          borderColor: theme.colors.glassBorder,
                          backgroundColor: theme.colors.glass,
                        },
                      ]}
                    >
                      <Icon size={16} color={theme.colors.text} />
                    </Pressable>
                  );
                })}
              </View>
            </FadeIn>
          </View>

          <FadeIn delay={220} style={[styles.visual, { flex: isDesktop ? 0.85 : undefined }]}>
            <GlassCard glow strong style={styles.visualCard} contentStyle={styles.visualContent}>
              <View style={styles.orbStage}>
                <HeroOrb />
                <View
                  style={[
                    styles.profileFrame,
                    {
                      borderColor: theme.colors.glassBorder,
                      backgroundColor: theme.colors.glassStrong,
                    },
                  ]}
                >
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                    }}
                    style={styles.profile}
                    accessibilityLabel={`${SITE.name} profile portrait`}
                  />
                </View>
              </View>
              <View style={styles.badgeCloud}>
                {TECH_BADGES.map((badge, index) => (
                  <GlassBadge
                    key={badge}
                    label={badge}
                    tone={index % 2 === 0 ? 'accent' : 'default'}
                    style={[
                      styles.floatBadge,
                      index % 2 === 0 ? styles.badgeLeft : styles.badgeRight,
                    ]}
                  />
                ))}
              </View>
            </GlassCard>
          </FadeIn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    alignSelf: 'center',
  },
  grid: {
    gap: spacing.xl,
    alignItems: 'center',
  },
  copy: {
    gap: spacing.md,
    width: '100%',
  },
  kicker: {
    ...typography.label,
    textTransform: 'uppercase',
    marginTop: spacing.sm,
  },
  tagline: {
    ...typography.bodyLarge,
    maxWidth: 560,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  social: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visual: {
    width: '100%',
    maxWidth: 460,
  },
  visualCard: {
    minHeight: 420,
  },
  visualContent: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  orbStage: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  profileFrame: {
    position: 'absolute',
    width: 118,
    height: 118,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: 6,
    overflow: 'hidden',
  },
  profile: {
    width: '100%',
    height: '100%',
    borderRadius: radii.lg,
  },
  badgeCloud: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  floatBadge: {
    marginHorizontal: 2,
  },
  badgeLeft: {
    transform: [{ translateY: -4 }],
  },
  badgeRight: {
    transform: [{ translateY: 6 }],
  },
  orbA: {
    top: 80,
    right: -40,
  },
  orbB: {
    bottom: 40,
    left: -60,
  },
});
