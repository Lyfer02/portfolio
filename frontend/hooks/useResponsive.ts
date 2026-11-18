import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1100;
  const isDesktop = width >= 1100;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    contentMaxWidth: isDesktop ? 1180 : isTablet ? 900 : width - 32,
    horizontalPadding: isMobile ? 16 : isTablet ? 28 : 40,
  };
}
