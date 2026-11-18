import Head from 'expo-router/head';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GlassNavbar } from '../components/glass/GlassNavbar';
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Footer,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '../components/sections';
import { AmbientBackground } from '../components/ui/AmbientBackground';
import { CursorGlow } from '../components/ui/CursorGlow';
import { SITE } from '../constants/content';
import { useNavigationSections } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { scrollRef, registerSection, onScroll } = useNavigationSections();

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <Head>
        <title>{`${SITE.name} · ${SITE.role}`}</title>
        <meta
          name="description"
          content="Premium glassmorphism developer portfolio by Alex Rivera — full stack, React Native, Expo, and Node.js."
        />
        <meta name="theme-color" content={theme.colors.background} />
        <meta property="og:title" content={`${SITE.name} · Developer Portfolio`} />
        <meta
          property="og:description"
          content="Futuristic glassmorphism portfolio with light/dark themes, interactive projects, and a live contact API."
        />
      </Head>

      <AmbientBackground />
      <CursorGlow />
      <GlassNavbar />

      <ScrollView
        ref={scrollRef as React.RefObject<any>}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => onScroll(event.nativeEvent.contentOffset.y)}
      >
        <HeroSection onLayout={registerSection} />
        <AboutSection onLayout={registerSection} />
        <SkillsSection onLayout={registerSection} />
        <ProjectsSection onLayout={registerSection} />
        <ExperienceSection onLayout={registerSection} />
        <ContactSection onLayout={registerSection} />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
