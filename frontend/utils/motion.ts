import { AccessibilityInfo, Platform } from 'react-native';

let reducedMotion = false;

if (Platform.OS !== 'web') {
  AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
    reducedMotion = enabled;
  });
  AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
    reducedMotion = enabled;
  });
} else if (typeof window !== 'undefined' && window.matchMedia) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = media.matches;
  media.addEventListener?.('change', (event) => {
    reducedMotion = event.matches;
  });
}

export function prefersReducedMotion() {
  return reducedMotion;
}

export function motionDuration(ms: number) {
  return prefersReducedMotion() ? 0 : ms;
}
