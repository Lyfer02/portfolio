import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { typography } from '../../theme';

type TypewriterRolesProps = {
  roles: string[];
};

export function TypewriterRoles({ roles }: TypewriterRolesProps) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] || '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles.length) return;

    if (reduced) {
      const timer = setInterval(() => {
        setIndex((current) => (current + 1) % roles.length);
      }, 2400);
      setText(roles[index % roles.length]);
      return () => clearInterval(timer);
    }

    const current = roles[index % roles.length];
    const speed = deleting ? 36 : 68;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((value) => (value + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      const next = deleting
        ? current.slice(0, Math.max(text.length - 1, 0))
        : current.slice(0, text.length + 1);
      setText(next);
    }, speed);

    return () => clearTimeout(timer);
  }, [deleting, index, reduced, roles, text]);

  return (
    <Text style={[styles.role, { color: theme.colors.accentSecondary }]}>
      {reduced ? roles[index % roles.length] : text}
      <Text style={{ color: theme.colors.accent }}>|</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  role: {
    ...typography.h3,
    minHeight: 30,
  },
});
