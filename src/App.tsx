import { ArrowUpRight } from 'lucide-react';
import { ActionLink } from './components/ui';
import { Reveal } from './components/Reveal';
import { TopNavigation } from './components/TopNavigation';
import { TrustRegistrySection } from './components/TrustRegistrySection';
import { AgentMarketplace } from './components/AgentMarketplace';
import { EvidenceSection } from './components/EvidenceSection';
import { PaymentSection } from './components/PaymentSection';
import { HeroBackground } from './components/HeroBackground';
import { SiteFooter } from './components/SiteFooter';

const lawSource = 'https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm';
function HeroSection() {
  return <section className="hero-section" id="top">
    <HeroBackground />
    <div className="shell hero-stage">
      <div className="hero-caption"><Reveal><h1>Giải đáp pháp luật.<br />Đối chiếu bằng chứng trên blockchain</h1></Reveal></div>
    </div>
  </section>;
}

export default function App() {
  return <div className="app-shell"><a className="skip-link" href="#agents">Bỏ qua để đến nội dung</a><TopNavigation /><main>
    <HeroSection /><AgentMarketplace />
    <TrustRegistrySection /><PaymentSection /><EvidenceSection />
    <section className="section final-cta-section" id="developers"><div className="shell final-cta"><Reveal><h2>Trở về<br />nguồn luật.</h2><p>Mở văn bản pháp luật được trích dẫn.</p></Reveal><Reveal><ActionLink href={lawSource} target="_blank" rel="noreferrer">Mở nguồn luật <ArrowUpRight size={20} /></ActionLink></Reveal></div></section>
  </main><SiteFooter /></div>;
}
