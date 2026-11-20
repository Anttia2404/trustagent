import { useEffect, useRef, useState } from 'react';
import type { LexAgentConfig, LexAgentEngine } from '../lib/lexAgentEngine';

// Seed CCRAZQ, recoloured to the site palette. The frame, HUD and agent log are off:
// the hero already carries its own headline and documents.
const HERO_BG_CONFIG: LexAgentConfig = {
  v: 1,
  seed: 'CCRAZQ',
  core: { symbol: 'gavel', style: 'line', scale: 1.126, detail: 0.906, columns: 6, plinth: true, hub: true, scan: true, lineWidth: 1.01, balance: 9.73, spin: -13.6 },
  agents: { count: 12, rings: 3, shape: 'cube', size: 1.019, radius: 2.496, spread: 0.136, tilt: 29.04, orbit: -6.83, cycle: 8.43, links: 0.674, docs: 20, docRadius: 3.604, retrieval: true },
  scene: { camera: 'persp', fov: 28.48, elevation: 20.91, zoom: 1.012, autoRotate: 3.04, floor: 'polar', floorAlpha: 0.11, fog: 0.608, verdict: 16, speed: 1, build: 2.4, mouse: 0.326 },
  frame: { motto: 'PHÁP LUẬT · KỶ CƯƠNG', border: false, caption: false, log: false, logLines: 10, labels: true, hud: false },
  color: { bg: '#161c1a', ink: '#e3e2da', accent: '#9fc7b8', inkAlpha: 0.55, font: 'serif', vignette: 0.3, grain: 0.05 },
};

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let disposed = false;
    let engine: LexAgentEngine | null = null;
    let observer: IntersectionObserver | null = null;
    let captionObserver: ResizeObserver | null = null;
    const narrow = window.matchMedia('(max-width: 760px)');
    const caption = node.parentElement?.querySelector<HTMLElement>('.hero-caption') ?? null;
    // On narrow screens the headline stacks at the bottom: frame the scene in the space above it.
    const fitAboveCaption = () => engine?.setInsets({ bottom: narrow.matches && caption ? caption.offsetHeight + 40 : 0 });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // three.js is loaded on demand so the hero copy never waits for it.
    import('../lib/lexAgentEngine').then(({ createLexAgentEngine }) => {
      if (disposed) return;
      const config = reduce
        ? { ...HERO_BG_CONFIG, scene: { ...HERO_BG_CONFIG.scene, build: 0, mouse: 0 } }
        : HERO_BG_CONFIG;
      try {
        engine = createLexAgentEngine(node, config, { interactive: false, pointerTarget: window, maxDpr: 1.75 });
      } catch {
        return; // no WebGL: the plain page background stays
      }
      if (reduce) engine.setPaused(true);
      fitAboveCaption();
      narrow.addEventListener('change', fitAboveCaption);
      if (caption) { captionObserver = new ResizeObserver(fitAboveCaption); captionObserver.observe(caption); }
      requestAnimationFrame(() => { if (!disposed) setReady(true); });
      observer = new IntersectionObserver(([entry]) => engine?.setRunning(entry.isIntersecting));
      observer.observe(node);
    }).catch(() => {});

    return () => {
      disposed = true;
      observer?.disconnect();
      captionObserver?.disconnect();
      narrow.removeEventListener('change', fitAboveCaption);
      engine?.dispose();
    };
  }, []);

  return <div ref={ref} className={`hero-bg${ready ? ' is-ready' : ''}`} aria-hidden="true" />;
}
