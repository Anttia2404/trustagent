import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, X } from 'lucide-react';
import { ActionLink, Badge, Button, Eyebrow } from './components/ui';
import { TopNavigation } from './components/TopNavigation';
import { HeroVisual } from './components/HeroVisual';
import { TrustRegistrySection } from './components/TrustRegistrySection';
import { AgentMarketplace } from './components/AgentMarketplace';
import { EvidenceSection } from './components/EvidenceSection';
import { PaymentSection } from './components/PaymentSection';
import { CommunitySection } from './components/CommunitySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { BrandMark } from './components/BrandMark';
import { Reveal } from './components/Reveal';
import { useDialogAccessibility } from './hooks/useDialogAccessibility';

function DocsDialog({ onClose }: { onClose: () => void }) {
  const { dialogRef, closeButtonRef } = useDialogAccessibility(onClose);

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div
        className="docs-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="docs-dialog-title"
        ref={dialogRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 5 }}
        transition={{ duration: 0.18 }}
      >
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        <div className="docs-dialog__icon"><BookOpen size={20} /></div>
        <Badge tone="amber">DOCUMENTATION PREVIEW</Badge>
        <h2 id="docs-dialog-title">Developer docs are in preparation.</h2>
        <p>Production endpoints, registry deployments and payment configuration are not published in this preview. Explore the integration concepts below without treating them as a live API.</p>
        <div className="docs-dialog__links">
          <a href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer" onClick={onClose}>ERC-8004 standard <ArrowUpRight size={14} /></a>
          <a href="#payment" onClick={onClose}>See the x402 flow <ArrowRight size={14} /></a>
        </div>
      </motion.div>
    </div>
  );
}

function HeroSection({ onDocsClick }: { onDocsClick: () => void }) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-backdrop" aria-hidden="true"><div className="hero-backdrop__glow" /><div className="hero-backdrop__grid" /></div>
      <div className="shell hero-layout">
        <div className="hero-copy">
          <Reveal>
            <Eyebrow><span className="eyebrow-pulse" /> LEGAL INTELLIGENCE INFRASTRUCTURE <span className="eyebrow-divider">/</span> VIETNAM</Eyebrow>
            <h1>Legal Intelligence<br />for the <span className="hero-gradient-text">Agent Economy.</span></h1>
            <p className="hero-subtitle">Discover specialized legal agents, pay per request, and verify every answer against the law that powered it.</p>
            <div className="hero-actions">
              <ActionLink href="#agents" className="hero-action-primary">Explore legal agents <ArrowDownRight size={15} /></ActionLink>
              <Button variant="secondary" onClick={onDocsClick}>Read developer docs <ArrowUpRight size={15} /></Button>
            </div>
            <div className="hero-product-note"><span className="hero-product-note__check"><Check size={13} /></span><span>Version-aware Legal RAG</span><i /><span>Built for AI agents</span><i /><span>Evidence-first</span></div>
          </Reveal>
        </div>
        <HeroVisual />
      </div>

      <div className="shell hero-bottomline">
        <span className="hero-bottomline__label">A NEW TRUST STACK FOR LEGAL AI</span>
        <div className="hero-pillars">
          <span>Legal RAG</span><span>ERC-8004</span><span>x402</span><span>Verifiable evidence</span><span>Community contribution</span>
        </div>
        <a className="hero-scroll" href="#trust" aria-label="Scroll to trust layer">Scroll to explore <ArrowRight size={13} /></a>
      </div>
    </section>
  );
}

function FinalCallToAction({ onDocsClick }: { onDocsClick: () => void }) {
  return (
    <section className="final-cta-section" id="developers">
      <div className="shell">
        <Reveal className="final-cta">
          <div className="final-cta__halo" aria-hidden="true" />
          <div className="final-cta__eyebrow"><span className="status-dot" /> NEXT-GENERATION LEGAL INFRASTRUCTURE</div>
          <h2>Build on Verifiable<br /><span>Legal Intelligence.</span></h2>
          <p>Discover TrustAgent agents, integrate legal intelligence into your AI products, and verify the evidence behind every answer.</p>
          <div className="final-cta__actions">
            <ActionLink href="#agents" className="hero-action-primary">Explore Legal Agents <ArrowUpRight size={15} /></ActionLink>
            <Button variant="secondary" onClick={onDocsClick}>View Developer Docs <ArrowUpRight size={15} /></Button>
          </div>
          <div className="final-cta__fineprint"><Check size={13} /> Agent identity, payment, legal evidence and review — each with a distinct role.</div>
        </Reveal>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__main">
          <a href="#top" className="brand-lockup" aria-label="TrustAgent home"><BrandMark size={30} /><span>Trust<span className="brand-lockup__accent">Agent</span></span></a>
          <span className="site-footer__tagline">Legal intelligence for the agent economy.</span>
          <a href="https://eips.ethereum.org/EIPS/eip-8004" className="footer-standard" target="_blank" rel="noreferrer">ERC-8004 standard <ArrowUpRight size={13} /></a>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 TrustAgent · Product concept preview</span>
          <p><strong>Legal disclaimer:</strong> TrustAgent provides informational legal assistance and does not replace professional legal advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className="app-shell">
      <TopNavigation onDocsClick={() => setDocsOpen(true)} />
      <main>
        <HeroSection onDocsClick={() => setDocsOpen(true)} />
        <TrustRegistrySection />
        <AgentMarketplace />
        <EvidenceSection />
        <PaymentSection />
        <CommunitySection />
        <ArchitectureSection />
        <FinalCallToAction onDocsClick={() => setDocsOpen(true)} />
      </main>
      <SiteFooter />
      <AnimatePresence>{docsOpen && <DocsDialog onClose={() => setDocsOpen(false)} />}</AnimatePresence>
    </div>
  );
}
