'use client';

import { ReactLenis } from 'lenis/react';

export function Smoothscroller() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 }}
    />
  );
}