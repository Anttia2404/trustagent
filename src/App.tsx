import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, FileCheck2, FileText, Globe2, Layers3, ShieldCheck, X } from 'lucide-react';
import { ActionLink, Button } from './components/ui';
import { TopNavigation } from './components/TopNavigation';
import { TrustRegistrySection } from './components/TrustRegistrySection';
import { AgentMarketplace } from './components/AgentMarketplace';
import { EvidenceSection } from './components/EvidenceSection';
import { PaymentSection } from './components/PaymentSection';
import { CommunitySection } from './components/CommunitySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { BrandMark } from './components/BrandMark';
import { useDialogAccessibility } from './hooks/useDialogAccessibility';

const lawSource = 'https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm';

function DocsDialog({ onClose }: { onClose: () => void }) {
  const { dialogRef, closeButtonRef } = useDialogAccessibility(onClose);
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div className="docs-dialog" role="dialog" aria-modal="true" aria-labelledby="docs-dialog-title" ref={dialogRef} tabIndex={-1} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}>
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        <div className="docs-dialog__icon"><BookOpen size={20} /></div>
        <p className="eyebrow">Developer documentation</p>
        <h2 id="docs-dialog-title">Developer docs are in preparation.</h2>
        <p>Production endpoints, registry deployments and payment configuration are not published in this preview. Explore the integration concepts below without treating them as a live API.</p>
        <div className="docs-dialog__links"><a href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer" onClick={onClose}>ERC-8004 standard <ArrowUpRight size={14} /></a><a href="#payment" onClick={onClose}>See the x402 flow <ArrowRight size={14} /></a></div>
      </motion.div>
    </div>
  );
}

function HeroSection({ onDocsClick }: { onDocsClick: () => void }) {
  return <section className="hero-section" id="top">
    <div className="shell hero-layout">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-rule" /> Legal intelligence infrastructure <span className="eyebrow-location">Vietnam · built to travel</span></p>
        <h1>Legal answers,<br /><em>grounded in the law.</em></h1>
        <p className="hero-subtitle">TrustAgent helps people and AI agents find, understand, and verify Vietnamese legal information against its source.</p>
        <div className="hero-actions"><ActionLink href="#product" className="hero-action-primary">See a sourced answer <ArrowDownRight size={16} /></ActionLink><Button variant="secondary" onClick={onDocsClick}>Developer docs <ArrowUpRight size={15} /></Button></div>
        <p className="hero-product-note"><span><Check size={14} /> Version-aware sources</span><span><Check size={14} /> Cited provisions</span><span><Check size={14} /> Evidence trail</span></p>
      </div>
      <div className="hero-visual" aria-label="Illustrative legal answer preview">
        <article className="answer-sheet">
          <div className="answer-sheet__masthead"><span>TrustAgent <i>Legal answer</i></span><span className="document-id">VN · TRAFFIC · 033</span></div>
          <p className="answer-sheet__label">A question about Vietnamese traffic law</p>
          <h2>Do motorcycle riders and passengers both need to wear a helmet?</h2>
          <div className="answer-sheet__answer"><span className="answer-sheet__answer-label">Short answer</span><p>Yes. The law requires both the driver and passengers on motorcycles and mopeds to wear helmets that meet national technical standards and to fasten the chin strap correctly.</p></div>
          <a className="law-citation" href={lawSource} target="_blank" rel="noreferrer"><span className="law-citation__mark">§</span><span><strong>Article 33(2)</strong><small>Law No. 36/2024/QH15 · effective 1 Jan 2025</small></span><ArrowUpRight size={15} /></a>
          <div className="answer-sheet__foot"><span><FileCheck2 size={15} /> Source linked · illustrative preview</span><span>Vietnam</span></div>
        </article>
      </div>
    </div>
    <div className="shell hero-bottomline"><span>Built for legal work today</span><span className="hero-bottomline__divider" /><span>Designed for agent workflows</span><a href="#product">Explore the product <ArrowRight size={14} /></a></div>
  </section>;
}

function ProductDemoSection() {
  return <section className="product-demo-section" id="product">
    <div className="shell">
      <div className="section-intro section-intro--wide"><p className="eyebrow">01 / Product walkthrough</p><h2>From a question<br />to its legal source.</h2><p>Follow one answer back through the materials and provisions that support it. This is an illustrative product preview, not a live query.</p></div>
      <div className="product-workbench">
        <div className="workbench-rail"><span className="workbench-brand"><BrandMark size={28} /> TrustAgent</span><span className="workbench-rail__item is-current"><BookOpen size={16} /> Legal research</span><span className="workbench-rail__item"><Layers3 size={16} /> Source library</span><span className="workbench-rail__jurisdiction"><Globe2 size={15} /> Vietnam law</span></div>
        <div className="workbench-main">
          <div className="workbench-topline"><span>Legal research <span>/</span> Traffic law</span><span className="preview-state">Illustrative preview</span></div>
          <div className="question-block"><span className="workbench-label">Your question</span><p>Do motorcycle riders and passengers both need to wear a helmet?</p></div>
          <div className="research-path" aria-label="Research path: question, source, provision, answer">
            <div><span>01</span><strong>Question</strong></div><i /><div><span>02</span><strong>Source</strong></div><i /><div><span>03</span><strong>Provision</strong></div><i /><div><span>04</span><strong>Answer</strong></div>
          </div>
          <div className="retrieved-document"><div className="retrieved-document__icon"><FileText size={19} /></div><div className="retrieved-document__text"><strong>Law on Road Traffic Order and Safety</strong><span>Law No. 36/2024/QH15 <b>·</b> In force 1 Jan 2025</span></div><span className="source-status"><Check size={13} /> Source</span></div>
          <div className="workbench-result"><div className="workbench-result__header"><span><ShieldCheck size={15} /> Cited answer</span><span>Vietnamese</span></div><p>Both the motorcycle driver and passengers must wear a helmet that meets national technical standards and fasten it correctly.</p><a href={lawSource} target="_blank" rel="noreferrer"><span>Article 33(2)</span> Open source text <ArrowUpRight size={14} /></a></div>
          <p className="workbench-disclaimer">Illustrative preview. Informational assistance only; not a substitute for professional legal advice.</p>
        </div>
        <aside className="workbench-sources"><span className="workbench-label">Retrieved source</span><div className="source-card"><span className="source-card__number">01</span><div><strong>36/2024/QH15</strong><p>Law on Road Traffic Order and Safety</p><span>Article 33 · Motorcycle riders</span></div><ArrowUpRight size={15} /></div><div className="source-detail"><span>Jurisdiction</span><strong>Vietnam</strong></div><div className="source-detail"><span>Effective date</span><strong>01 Jan 2025</strong></div><div className="source-detail"><span>Reference</span><strong>Article 33(2)</strong></div><a className="source-official" href={lawSource} target="_blank" rel="noreferrer">Open official text <ArrowUpRight size={14} /></a></aside>
      </div>
      <div className="product-demo-caption"><span>Question</span><i /><span>Retrieved document</span><i /><span>Relevant provision</span><i /><span>Cited answer</span></div>
    </div>
  </section>;
}

function FinalCallToAction({ onDocsClick }: { onDocsClick: () => void }) {
  return <section className="final-cta-section" id="developers"><div className="shell final-cta">
    <div><p className="eyebrow">Infrastructure for people and agents</p><h2>Build on legal intelligence<br /><em>you can trace.</em></h2><p>Explore the agent concepts or review how identity, evidence and per-request payment fit together.</p></div>
    <div className="final-cta__actions"><ActionLink href="#agents" className="hero-action-primary">Explore legal agents <ArrowUpRight size={15} /></ActionLink><Button variant="secondary" onClick={onDocsClick}>Developer docs <ArrowUpRight size={15} /></Button></div>
  </div></section>;
}

function SiteFooter() {
  return <footer className="site-footer"><div className="shell"><div className="site-footer__main"><a href="#top" className="brand-lockup" aria-label="TrustAgent home"><BrandMark size={30} /><span>Trust<span className="brand-lockup__accent">Agent</span></span></a><span className="site-footer__tagline">Legal intelligence, made legible.</span><a className="footer-standard" href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer">ERC-8004 standard <ArrowUpRight size={13} /></a></div><div className="site-footer__bottom"><span>© 2026 TrustAgent · Product concept preview</span><p><strong>Legal disclaimer:</strong> TrustAgent provides informational legal assistance and does not replace professional legal advice.</p></div></div></footer>;
}

export default function App() {
  const [docsOpen, setDocsOpen] = useState(false);
  return <div className="app-shell">
    <TopNavigation onDocsClick={() => setDocsOpen(true)} />
    <main>
      <HeroSection onDocsClick={() => setDocsOpen(true)} />
      <ProductDemoSection />
      <EvidenceSection />
      <AgentMarketplace />
      <div className="infrastructure-intro" id="infrastructure"><div className="shell"><p className="eyebrow">05 / Agent infrastructure</p><h2>Trust signals and payment,<br /><em>with distinct jobs.</em></h2><p>Protocols describe how agents identify, discover and pay for services. They do not establish that a legal answer is correct.</p></div></div>
      <TrustRegistrySection />
      <PaymentSection />
      <CommunitySection />
      <section className="global-intro" id="global"><div className="shell global-intro__inner"><div><p className="eyebrow">07 / Global infrastructure</p><h2>One legal system at a time.<br /><em>Built to expand.</em></h2><p>TrustAgent focuses on Vietnamese legal intelligence today. The architecture is intended to support additional countries and jurisdictions as their sources, languages and rules are integrated.</p></div><div className="jurisdiction-ledger"><div><span className="ledger-index">01</span><div><strong>Vietnam</strong><small>Initial focus</small></div><span className="ledger-state ledger-state--current">Current</span></div><div><span className="ledger-index">02</span><div><strong>Additional jurisdictions</strong><small>Architecture direction</small></div><span className="ledger-state">Future plan</span></div><div><span className="ledger-index">03</span><div><strong>Local legal sources</strong><small>Language · versions · effective dates</small></div><span className="ledger-state">Per jurisdiction</span></div></div></div></section>
      <ArchitectureSection />
      <FinalCallToAction onDocsClick={() => setDocsOpen(true)} />
    </main>
    <SiteFooter />
    <AnimatePresence>{docsOpen && <DocsDialog onClose={() => setDocsOpen(false)} />}</AnimatePresence>
  </div>;
}
