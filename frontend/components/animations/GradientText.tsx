import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type GradientTextProps = TextProps & {
  colors?: readonly [string, string, ...string[]];
  textStyle?: TextStyle;
};

export function GradientText({
  children,
  colors,
  style,
  textStyle,
  ...rest
}: GradientTextProps) {
  const { theme } = useTheme();
  const gradient = colors || theme.gradients.text;

  if (Platform.OS === 'web') {
    const webStyle = {
      backgroundImage: `linear-gradient(120deg, ${gradient.join(', ')})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
    } as unknown as TextStyle;

    return (
      <Text {...rest} style={[style, textStyle, webStyle]}>
        {children}
      </Text>
    );
  }

  return (
    <LinearGradient colors={[...gradient]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Text {...rest} style={[styles.masked, style, textStyle, { color: theme.colors.text }]}>
        {children}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  masked: {
    opacity: 0.98,
  },
});
