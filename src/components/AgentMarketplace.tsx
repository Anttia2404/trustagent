import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, GitBranch } from 'lucide-react';
import { agents, type LegalAgent } from '../lib/content';
import { Reveal } from './Reveal';

const routingExamples: Record<LegalAgent['domain'], { label: string; query: string }> = {
  traffic: { label: 'Luật giao thông', query: 'Người ngồi sau xe máy có phải đội mũ bảo hiểm?' },
  labor: { label: 'Luật lao động', query: 'Chấm dứt hợp đồng lao động cần báo trước bao lâu?' },
  tax: { label: 'Luật thuế', query: 'Hóa đơn điện tử cần những thông tin nào?' },
};
const desktopBranches = ['M590 210H645V70H700', 'M590 210H700', 'M590 210H645V350H700'];
const mobileBranches = ['M175 332V348H58.33V364', 'M175 332V364', 'M175 332V348H291.67V364'];

type RoutingPhase = 'typing' | 'routing' | 'matched';

function RoutingConnections({ activeDomain, phase, paused }: { activeDomain: LegalAgent['domain']; phase: RoutingPhase; paused: boolean }) {
  const activeIndex = agents.findIndex((agent) => agent.domain === activeDomain);
  return <>
    <svg className="routing-connections routing-connections--desktop" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id="routing-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L8 4L0 8" fill="none" stroke="var(--accent)" strokeWidth="1.5" /></marker></defs>
      <path className={`routing-wire ${phase !== 'typing' ? 'is-active' : ''}`} d="M260 210H370" markerEnd="url(#routing-arrow)" />
      {agents.map((agent, index) => <path key={agent.domain} className={`routing-wire ${agent.domain === activeDomain && phase !== 'typing' ? 'is-active' : ''}`} d={desktopBranches[index]} markerEnd={agent.domain === activeDomain && phase !== 'typing' ? "url(#routing-arrow)" : undefined} />)}
      <circle className="routing-junction" cx="645" cy="210" r="4" />
      {phase === 'routing' && !paused && <circle key={activeDomain} className="routing-packet" r="4"><animateMotion dur="1.8s" repeatCount="1" fill="freeze" path={`M260 210H590${activeIndex === 1 ? 'H700' : `H645V${activeIndex === 0 ? 70 : 350}H700`}`} /></circle>}
    </svg>
    <svg className="routing-connections routing-connections--mobile" viewBox="0 0 350 474" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id="routing-arrow-mobile" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L8 4L0 8" fill="none" stroke="var(--accent)" strokeWidth="1.5" /></marker></defs>
      <path className={`routing-wire ${phase !== 'typing' ? 'is-active' : ''}`} d="M175 200V232" markerEnd="url(#routing-arrow-mobile)" />
      {agents.map((agent, index) => <path key={agent.domain} className={`routing-wire ${agent.domain === activeDomain && phase !== 'typing' ? 'is-active' : ''}`} d={mobileBranches[index]} markerEnd={agent.domain === activeDomain && phase !== 'typing' ? "url(#routing-arrow-mobile)" : undefined} />)}

      {phase === 'routing' && !paused && <circle key={activeDomain} className="routing-packet" r="4"><animateMotion dur="1.8s" repeatCount="1" fill="freeze" path={`M175 200V332${mobileBranches[activeIndex].slice('M175 332'.length)}`} /></circle>}
    </svg>
  </>;
}

export function AgentMarketplace() {
  const [sequence, setSequence] = useState({ index: 0, phase: 'typing' as RoutingPhase, characters: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const active = agents[sequence.index];
  const question = routingExamples[active.domain].query;
  const characters = Array.from(question);
  const phase: RoutingPhase = reduceMotion ? 'matched' : sequence.phase;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    const duration = sequence.phase === 'typing' ? (sequence.characters === 0 ? 450 : 38) : sequence.phase === 'routing' ? 1800 : 2400;
    const timer = window.setTimeout(() => {
      if (sequence.phase === 'typing') {
        setSequence((current) => current.characters < characters.length ? { ...current, characters: current.characters + 1 } : { ...current, phase: 'routing' });
      } else if (sequence.phase === 'routing') {
        setSequence((current) => ({ ...current, phase: 'matched' }));
      } else {
        setSequence((current) => ({ index: (current.index + 1) % agents.length, phase: 'typing', characters: 0 }));
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [sequence, visible, reduceMotion, characters.length]);

  return <section ref={sectionRef} className="section section--agents" id="agents" aria-labelledby="routing-heading"><div className="shell agents-layout">
    <Reveal className="routing-heading"><h2 id="routing-heading">Một câu hỏi.<br />Đúng chuyên môn.</h2><p>Câu hỏi được phân loại theo lĩnh vực, rồi chuyển đến Agent phù hợp để truy xuất nguồn luật và kiểm tra trích dẫn.</p></Reveal>
    <Reveal><div className={`routing-demo routing-demo--${phase}`} data-ui data-paused={!visible}>
      <div className="routing-graph" role="group" aria-label="Minh hoạ tự động: câu hỏi được chuyển đến Agent đúng chuyên môn">
        <RoutingConnections activeDomain={active.domain} phase={phase} paused={!visible} />
        <div className="routing-input routing-node"><p className="routing-question" lang="vi"><span className="routing-question-full">{question}</span><span aria-hidden="true">{reduceMotion ? question : characters.slice(0, sequence.characters).join('')}{phase === 'typing' && <span className="routing-cursor" />}</span></p></div>
        <div className={`routing-router routing-node ${phase === 'routing' && visible ? 'is-processing' : ''}`}><GitBranch size={28} strokeWidth={1.4} /><strong>Bộ định tuyến</strong><span>{phase === 'typing' ? 'Đang nhận câu hỏi' : phase === 'routing' ? 'Đang phân loại…' : routingExamples[active.domain].label}</span></div>
        <div className="routing-destinations" role="group" aria-label="Agent chuyên môn">{agents.map((agent) => {
          const Icon = agent.icon;
          const isActive = active.domain === agent.domain && phase === 'matched';
          return <div key={agent.domain} className={`routing-agent routing-node ${isActive ? 'is-active' : ''}`} role="group" aria-label={isActive ? `${agent.name}, đã nhận câu hỏi` : agent.name}><Icon size={23} strokeWidth={1.5} /><span><strong className="routing-agent-full-name">{agent.name}</strong><strong className="routing-agent-short-name" aria-hidden="true">{agent.domain === 'traffic' ? 'Giao thông' : agent.domain === 'labor' ? 'Lao động' : 'Thuế'}</strong><small>{agent.domain === 'traffic' ? 'Quy định và xử phạt giao thông' : agent.domain === 'labor' ? 'Pháp luật lao động' : 'Quy định thuế và hoá đơn'}</small></span><ArrowRight className="routing-agent-arrow" size={18} /></div>;
        })}</div>
      </div>
    </div></Reveal>
  </div></section>;
}
