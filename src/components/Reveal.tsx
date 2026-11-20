import { useEffect, useRef, type ReactNode } from 'react';
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.animate([{ opacity: 0.4, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650, delay: delay * 1000, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' });
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
