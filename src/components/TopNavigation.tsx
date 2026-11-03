import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Button } from './ui';

const links = [
  { label: 'Agents', href: '#agents' },
  { label: 'Trust layer', href: '#trust' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Contribute', href: '#community' },
];

export function TopNavigation({ onDocsClick }: { onDocsClick: () => void }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="#top" className="brand-lockup" aria-label="TrustAgent home" onClick={closeMenu}>
          <BrandMark size={34} />
          <span>Trust<span className="brand-lockup__accent">Agent</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>

        <div className="site-header__actions">
          <span className="header-status"><span className="status-dot" /> Infrastructure preview</span>
          <Button className="header-cta" onClick={onDocsClick}>
            Developer docs <ArrowUpRight size={14} aria-hidden="true" />
          </Button>
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
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <button type="button" onClick={() => { closeMenu(); onDocsClick(); }}>
            Developer docs <ArrowUpRight size={15} />
          </button>
        </nav>
      )}
    </header>
  );
}
