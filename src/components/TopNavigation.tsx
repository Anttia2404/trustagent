import { useEffect, useState } from 'react';
import { ArrowDown, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { ActionLink } from './ui';

const links = [
  { label: 'Product', href: '#product' },
  { label: 'Legal agents', href: '#agents' },
  { label: 'On-chain trust', href: '#infrastructure' },
  { label: 'Receipts', href: '#evidence' },
];

/** Page sections in document order, each mapped to the nav item it belongs to (null clears the highlight). */
const sectionOrder: Array<[id: string, navId: string | null]> = [
  ['product', 'product'],
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

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="#top" className="brand-lockup" aria-label="TrustAgent home" onClick={closeMenu}>
          <BrandMark size={34} />
          <span>Trust<span className="brand-lockup__accent">Agent</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href} {...currentProps(link.href)}>{link.label}</a>)}
        </nav>

        <div className="site-header__actions">
          <span className="header-status"><span className="status-dot" /> Infrastructure preview</span>
          <ActionLink className="header-cta" href="#developers">
            API <ArrowDown size={14} aria-hidden="true" />
          </ActionLink>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} {...currentProps(link.href)}>{link.label}</a>
          ))}
          <a href="#developers" onClick={closeMenu}>
            API <ArrowDown size={15} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
