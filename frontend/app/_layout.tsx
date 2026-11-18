import React from 'react';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';
import { ThemeProvider } from '../theme/theme';

export default function Layout() {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.title = 'Aarav Sharma | Full Stack Developer';
    const m = document.querySelector('meta[name=description]') ?? document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }));
    m.setAttribute('content', 'Portfolio of Aarav Sharma, a full stack developer building React Native apps and Node.js APIs.');
  }
  return <ThemeProvider><Slot /></ThemeProvider>;
}
