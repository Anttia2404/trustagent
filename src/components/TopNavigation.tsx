import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { ActionLink } from './ui';

const APP_URL = 'https://trust-agent-eight.vercel.app/';

const links = [
  { label: 'Agent', href: '#agents' },
  { label: 'Niềm tin', href: '#infrastructure' },
  { label: 'Biên nhận', href: '#evidence' },
];

/** Page sections in document order, each mapped to the nav item it belongs to (null clears the highlight). */
const sectionOrder: Array<[id: string, navId: string | null]> = [
  ['agents', 'agents'],
  ['infrastructure', 'infrastructure'],
  ['trust', 'infrastructure'],
  ['payment', 'infrastructure'],
  ['evidence', 'evidence'],
  ['developers', null],
];

/** Returns the id of the nav-linked section currently under the top third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const [id, navId] of sectionOrder) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= readingLine) current = navId;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export function TopNavigation() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();
  const currentProps = (href: string) => (href.slice(1) === activeSection ? { 'aria-current': 'location' as const } : {});

  const closeMenu = () => setOpen(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.querySelector<HTMLButtonElement>('.mobile-menu-button')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="#top" className="brand-lockup" aria-label="Trang chủ TrustAgent" onClick={closeMenu}>
          <BrandMark size={34} />
          <span>Trust<span className="brand-lockup__accent">Agent</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {links.map((link) => <a key={link.href} href={link.href} {...currentProps(link.href)}>{link.label}</a>)}
        </nav>

        <div className="site-header__actions">
          <ActionLink className="header-cta" href={APP_URL}>
            Vào ứng dụng <ArrowUpRight size={14} aria-hidden="true" />
          </ActionLink>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Điều hướng trên điện thoại">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} {...currentProps(link.href)}>{link.label}</a>
          ))}
          <a href={APP_URL} onClick={closeMenu}>
            Vào ứng dụng <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
