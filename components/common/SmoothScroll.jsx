"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        anchors: { offset: -96 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
