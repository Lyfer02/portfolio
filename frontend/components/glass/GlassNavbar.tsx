import * as WebBrowser from 'expo-web-browser';
import { Download, Menu, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAV_LINKS, SITE } from '../../constants/content';
import { useNavigationSections } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GlassButton } from './GlassButton';
import { GlassSurface } from './GlassSurface';

export function GlassNavbar() {
  const { theme } = useTheme();
  const { activeSection, scrollToSection } = useNavigationSections();
  const { isMobile, horizontalPadding } = useResponsive();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const openResume = async () => {
    if (SITE.resumeUrl.startsWith('http')) {
      await WebBrowser.openBrowserAsync(SITE.resumeUrl);
      return;
    }
    await Linking.openURL(SITE.resumeUrl);
  };

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: Math.max(insets.top, 12),
          paddingHorizontal: horizontalPadding,
        },
      ]}
      pointerEvents="box-none"
    >
      <GlassSurface
        strong
        intensity={36}
        radius={radii.pill}
        style={[styles.bar, { backgroundColor: theme.colors.navbar }]}
        contentStyle={styles.barContent}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go to home"
          onPress={() => {
            setOpen(false);
            scrollToSection('home');
          }}
          style={styles.brand}
        >
          <View style={[styles.logo, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.logoText}>{SITE.initials}</Text>
          </View>
          {!isMobile ? (
            <Text style={[styles.brandName, { color: theme.colors.text }]}>{SITE.name}</Text>
          ) : null}
        </Pressable>

        {!isMobile ? (
          <View style={styles.links}>
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.id;
              return (
                <Pressable
                  key={link.id}
                  accessibilityRole="link"
                  accessibilityState={{ selected: active }}
                  onPress={() => scrollToSection(link.id)}
                  style={styles.link}
                >
                  <Text
                    style={[
                      styles.linkText,
                      { color: active ? theme.colors.text : theme.colors.textMuted },
                    ]}
                  >
                    {link.label}
                  </Text>
                  {active ? (
                    <View style={[styles.indicator, { backgroundColor: theme.colors.accentSecondary }]} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}

        <View style={styles.actions}>
          <ThemeToggle />
          {!isMobile ? (
            <GlassButton
              label="Resume"
              variant="secondary"
              icon={<Download size={15} color={theme.colors.text} />}
              onPress={openResume}
              style={styles.resume}
            />
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={open ? 'Close menu' : 'Open menu'}
              onPress={() => setOpen((value) => !value)}
              style={[styles.menuButton, { borderColor: theme.colors.glassBorder }]}
            >
              {open ? (
                <X size={18} color={theme.colors.text} />
              ) : (
                <Menu size={18} color={theme.colors.text} />
              )}
            </Pressable>
          )}
        </View>
      </GlassSurface>

      {isMobile && open ? (
        <GlassSurface
          strong
          intensity={40}
          radius={radii.xl}
          style={styles.drawer}
          contentStyle={styles.drawerContent}
        >
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.id;
            return (
              <Pressable
                key={link.id}
                accessibilityRole="link"
                onPress={() => {
                  setOpen(false);
                  scrollToSection(link.id);
                }}
                style={[
                  styles.drawerLink,
                  active && { backgroundColor: theme.colors.glass },
                ]}
              >
                <Text style={[styles.drawerLinkText, { color: theme.colors.text }]}>
                  {link.label}
                </Text>
              </Pressable>
            );
          })}
          <GlassButton
            label="Download Resume"
            icon={<Download size={15} color="#fff" />}
            onPress={() => {
              setOpen(false);
              openResume();
            }}
          />
        </GlassSurface>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  bar: {
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },
  barContent: {
    minHeight: 64,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 13,
  },
  brandName: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 15,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  linkText: {
    ...typography.label,
    textTransform: 'none',
    letterSpacing: 0.1,
    fontSize: 13,
  },
  indicator: {
    marginTop: 6,
    width: 16,
    height: 3,
    borderRadius: radii.pill,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resume: {
    minWidth: 118,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    marginTop: spacing.sm,
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },
  drawerContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  drawerLink: {
    borderRadius: radii.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  drawerLinkText: {
    ...typography.button,
  },
});
