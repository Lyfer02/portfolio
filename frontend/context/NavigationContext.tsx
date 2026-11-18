import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { LayoutChangeEvent } from 'react-native';
import type { NavSection } from '../types';

type SectionLayouts = Partial<Record<NavSection, { y: number; height: number }>>;

type Scrollable = {
  scrollTo: (options: { y: number; animated?: boolean }) => void;
};

type NavigationContextValue = {
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  scrollRef: React.RefObject<Scrollable | null>;
  registerSection: (id: NavSection, event: LayoutChangeEvent) => void;
  scrollToSection: (id: NavSection) => void;
  onScroll: (offsetY: number) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<Scrollable | null>(null);
  const layouts = useRef<SectionLayouts>({});
  const [activeSection, setActiveSection] = useState<NavSection>('home');

  const registerSection = useCallback((id: NavSection, event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    layouts.current[id] = { y, height };
  }, []);

  const scrollToSection = useCallback((id: NavSection) => {
    const target = layouts.current[id];
    if (!target || !scrollRef.current) return;
    setActiveSection(id);
    scrollRef.current.scrollTo({ y: Math.max(target.y - 88, 0), animated: true });
  }, []);

  const onScroll = useCallback((offsetY: number) => {
    const entries = Object.entries(layouts.current) as [
      NavSection,
      { y: number; height: number },
    ][];
    if (!entries.length) return;

    const probe = offsetY + 140;
    let current: NavSection = 'home';

    for (const [id, layout] of entries) {
      if (probe >= layout.y && probe < layout.y + layout.height) {
        current = id;
        break;
      }
      if (probe >= layout.y) {
        current = id;
      }
    }

    setActiveSection((prev) => (prev === current ? prev : current));
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      scrollRef,
      registerSection,
      scrollToSection,
      onScroll,
    }),
    [activeSection, registerSection, scrollToSection, onScroll]
  );

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigationSections() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationSections must be used within NavigationProvider');
  }
  return context;
}
