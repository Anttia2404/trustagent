import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, FileCheck2, FileText, Globe2, Layers3, ShieldCheck } from 'lucide-react';
import { ActionLink } from './components/ui';
import { TopNavigation } from './components/TopNavigation';
import { TrustRegistrySection } from './components/TrustRegistrySection';
import { AgentMarketplace } from './components/AgentMarketplace';
import { EvidenceSection } from './components/EvidenceSection';
import { PaymentSection } from './components/PaymentSection';
import { CommunitySection } from './components/CommunitySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { BrandMark } from './components/BrandMark';
import { apiReadmeUrl } from './lib/content';

const lawSource = 'https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm';

function HeroSection() {
  return <section className="hero-section" id="top">
    <div className="shell hero-layout">
      <div className="hero-copy">
        <h1>Legal answers,<br /><em>grounded in the law.</em></h1>
        <p className="hero-subtitle">TrustAgent helps people and AI agents find, understand, and verify Vietnamese legal information against its source.</p>
        <div className="hero-actions"><ActionLink href="#product" className="hero-action-primary">Trace an answer <ArrowDown size={16} aria-hidden="true" /></ActionLink><ActionLink variant="secondary" href={apiReadmeUrl} target="_blank" rel="noreferrer">API README <ArrowUpRight size={15} /></ActionLink></div>
        <p className="hero-product-note"><span><Check size={14} /> Vietnamese legal corpus</span><span><Check size={14} /> Cited provisions</span><span><Check size={14} /> Evidence checks</span></p>
      </div>
      <div className="hero-visual" aria-label="Illustrative legal answer preview">
        <article className="answer-sheet">
          <div className="answer-sheet__masthead"><span>TrustAgent <i>Legal answer</i></span><span className="document-id">VIETNAM · TRAFFIC</span></div>
          <p className="answer-sheet__label">A question about Vietnamese traffic law</p>
          <h2>Do motorcycle riders and passengers both need to wear a helmet?</h2>
          <div className="answer-sheet__answer"><span className="answer-sheet__answer-label">Short answer</span><p>Yes. Rider and passenger must both wear a standard helmet with the chin strap fastened.</p></div>
          <a className="law-citation" href={lawSource} target="_blank" rel="noreferrer"><span className="law-citation__mark">§</span><span><strong>Article 33(2)</strong><small>Law No. 36/2024/QH15 · effective 1 Jan 2025</small></span><ArrowUpRight size={15} /></a>
          <div className="answer-sheet__foot"><span><FileCheck2 size={15} /> Source linked · illustrative preview</span><span>Vietnam</span></div>
        </article>
      </div>
    </div>
  </section>;
}

function ProductDemoSection() {
  return <section className="product-demo-section" id="product">
    <div className="shell">
      <div className="section-intro section-intro--wide"><h2>From a question<br />to its legal source.</h2><p>Follow a legal question through domain routing, hybrid retrieval and citation checks.</p></div>
      <div className="product-workbench">
        <div className="workbench-rail"><span className="workbench-brand"><BrandMark size={28} /> TrustAgent</span><span className="workbench-rail__item is-current"><BookOpen size={16} /> Legal research</span><span className="workbench-rail__item"><Layers3 size={16} /> Source library</span><span className="workbench-rail__jurisdiction"><Globe2 size={15} /> Vietnam law</span></div>
        <div className="workbench-main">
          <div className="workbench-topline"><span>Legal research <span>/</span> Traffic law</span><span className="preview-state">Illustrative · not a live query</span></div>
          <div className="question-block"><span className="workbench-label">Your question</span><p>Do motorcycle riders and passengers both need to wear a helmet?</p></div>
          <div className="research-path" aria-label="Research path: question, source, provision, answer">
            <div><span>01</span><strong>Question</strong></div><i /><div><span>02</span><strong>Source</strong></div><i /><div><span>03</span><strong>Provision</strong></div><i /><div><span>04</span><strong>Answer</strong></div>
          </div>
          <div className="retrieved-document"><div className="retrieved-document__icon"><FileText size={19} /></div><div className="retrieved-document__text"><strong>Law on Road Traffic Order and Safety</strong><span>Law No. 36/2024/QH15 <b>·</b> In force 1 Jan 2025</span></div><span className="source-status"><Check size={13} /> Source</span></div>
          <div className="workbench-result"><div className="workbench-result__header"><span><ShieldCheck size={15} /> Cited answer</span><span>Vietnamese</span></div><p>Both the motorcycle driver and passengers must wear a helmet that meets national technical standards and fasten it correctly.</p><a href={lawSource} target="_blank" rel="noreferrer"><span>Article 33(2)</span> Open source text <ArrowUpRight size={14} /></a></div>
          <p className="workbench-disclaimer">Informational assistance only · not a substitute for professional legal advice.</p>
        </div>
        <aside className="workbench-sources"><span className="workbench-label">Retrieved source</span><div className="source-card"><span className="source-card__number">01</span><div><strong>36/2024/QH15</strong><p>Law on Road Traffic Order and Safety</p><span>Article 33 · Motorcycle riders</span></div></div><a className="source-official" href={lawSource} target="_blank" rel="noreferrer">Open official text <ArrowUpRight size={14} /></a></aside>
      </div>
    </div>
  </section>;
}

function FinalCallToAction() {
  return <section className="final-cta-section" id="developers"><div className="shell final-cta">
    <div><h2>Build on legal intelligence<br /><em>you can trace.</em></h2><p>Endpoints, setup and the optional paid traffic route are documented in the backend README.</p></div>
    <div className="final-cta__actions"><ActionLink href={apiReadmeUrl} target="_blank" rel="noreferrer" className="hero-action-primary">Read the API README <ArrowUpRight size={15} /></ActionLink><ActionLink variant="secondary" href="#agents">Explore legal agents <ArrowRight size={15} /></ActionLink></div>
  </div></section>;
}

function SiteFooter() {
  return <footer className="site-footer"><div className="shell"><div className="site-footer__main"><a href="#top" className="brand-lockup" aria-label="TrustAgent home"><BrandMark size={30} /><span>Trust<span className="brand-lockup__accent">Agent</span></span></a><span className="site-footer__tagline">Legal intelligence, made legible.</span><a className="footer-standard" href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer">ERC-8004 standard <ArrowUpRight size={13} /></a></div><div className="site-footer__bottom"><span>© 2026 TrustAgent · Product concept preview</span><p><strong>Legal disclaimer:</strong> TrustAgent provides informational legal assistance and does not replace professional legal advice.</p></div></div></footer>;
}

export default function App() {
  return <div className="app-shell">
    <TopNavigation />
    <main>
      <HeroSection />
      <ProductDemoSection />
      <EvidenceSection />
      <AgentMarketplace />
      <div className="infrastructure-intro" id="infrastructure"><div className="shell"><h2>Trust signals and payment,<br /><em>with distinct jobs.</em></h2><p>ERC-8004 describes agent identity and trust signals; x402 handles HTTP payment. Neither protocol establishes that a legal answer is correct.</p></div></div>
      <TrustRegistrySection />
      <PaymentSection />
      <ArchitectureSection />
      <CommunitySection />
      <section className="global-intro" id="global"><div className="shell global-intro__inner"><div><h2>One legal system at a time.<br /><em>Built to expand.</em></h2><p>Today: Vietnamese traffic, labor and tax law. New jurisdictions need local sources, language support and legal metadata.</p></div><div className="jurisdiction-ledger"><div><span className="ledger-index">01</span><div><strong>Vietnam</strong><small>Initial focus</small></div><span className="ledger-state ledger-state--current">Current</span></div><div><span className="ledger-index">02</span><div><strong>Traffic · Labor · Tax</strong><small>Current legal domains</small></div><span className="ledger-state ledger-state--current">Implemented</span></div><div><span className="ledger-index">03</span><div><strong>Additional jurisdictions</strong><small>Local corpora and legal rules required</small></div><span className="ledger-state">Future plan</span></div></div></div></section>
      <FinalCallToAction />
    </main>
    <SiteFooter />
  </div>;
}
