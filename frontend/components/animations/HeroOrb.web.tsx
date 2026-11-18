import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Web-only Three.js orb for a premium 3D hero presence.
 */
export function HeroOrb() {
  const hostRef = useRef<any>(null);
  const { theme, isDark } = useTheme();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const host = hostRef.current as HTMLElement | null;
    if (!host) return;

    const width = 320;
    const height = 320;

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const accent = new Color(theme.colors.accent);
    const accentSecondary = new Color(theme.colors.accentSecondary);

    const core = new Mesh(
      new IcosahedronGeometry(1.15, 1),
      new MeshStandardMaterial({
        color: accent,
        emissive: accentSecondary,
        emissiveIntensity: isDark ? 0.55 : 0.28,
        metalness: 0.35,
        roughness: 0.25,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      })
    );
    scene.add(core);

    const glow = new Mesh(
      new SphereGeometry(1.05, 48, 48),
      new MeshStandardMaterial({
        color: accentSecondary,
        emissive: accent,
        emissiveIntensity: isDark ? 0.4 : 0.2,
        metalness: 0.2,
        roughness: 0.35,
        transparent: true,
        opacity: 0.35,
      })
    );
    scene.add(glow);

    scene.add(new AmbientLight(0xffffff, isDark ? 0.55 : 0.75));
    const key = new DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 2);
    scene.add(key);
    const rim = new PointLight(theme.colors.accentSecondary, 1.4, 12);
    rim.position.set(-3, -1, 3);
    scene.add(rim);

    let frame = 0;
    let alive = true;
    const animate = () => {
      if (!alive) return;
      frame = requestAnimationFrame(animate);
      if (!reduced) {
        core.rotation.x += 0.004;
        core.rotation.y += 0.007;
        glow.rotation.y -= 0.003;
        const pulse = 1 + Math.sin(Date.now() * 0.0016) * 0.03;
        glow.scale.setScalar(pulse);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      renderer.dispose();
      core.geometry.dispose();
      glow.geometry.dispose();
      (core.material as MeshStandardMaterial).dispose();
      (glow.material as MeshStandardMaterial).dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [isDark, reduced, theme.colors.accent, theme.colors.accentSecondary]);

  return (
    <View style={styles.wrap} pointerEvents="none">
      <View ref={hostRef} style={styles.canvasHost} />
      <View
        style={[
          styles.ring,
          {
            borderColor: theme.colors.glassBorder,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasHost: {
    width: 280,
    height: 280,
    borderRadius: 999,
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 999,
    borderWidth: 1,
  },
});
