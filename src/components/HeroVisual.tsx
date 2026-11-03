import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpenCheck, Check, Fingerprint, Network, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Badge, Surface } from './ui';
import { BrandMark } from './BrandMark';

export function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12 }}
    >
      <Surface className="hero-console">
        <div className="hero-console__top">
          <div className="console-label"><span className="console-label__icon"><Network size={15} /></span> Agent trust graph</div>
          <Badge tone="amber">DEMO PREVIEW</Badge>
        </div>

        <div className="hero-graph" aria-hidden="true">
          <div className="hero-graph__grid" />
          <div className="graph-ring graph-ring--outer" />
          <div className="graph-ring graph-ring--inner" />
          <div className="graph-path graph-path--a" />
          <div className="graph-path graph-path--b" />
          <div className="graph-path graph-path--c" />
          <div className="graph-node graph-node--identity"><Fingerprint size={16} /><span>Identity</span></div>
          <div className="graph-node graph-node--evidence"><ShieldCheck size={16} /><span>Evidence</span></div>
          <div className="graph-node graph-node--payment"><Zap size={15} /><span>x402</span></div>
          <motion.div className="graph-pulse" animate={{ scale: [1, 1.12, 1], opacity: [0.58, 0.88, 0.58] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="graph-core"><BrandMark size={48} /><span>TRAFFIC LAW<br />AGENT</span></div>
        </div>

        <div className="hero-agent-card">
          <div className="hero-agent-card__icon"><BookOpenCheck size={17} /></div>
          <div className="hero-agent-card__copy"><strong>Traffic Law Agent</strong><span>Vietnamese regulations & penalties</span></div>
          <div className="hero-agent-card__status"><span className="status-dot" /> MVP direction</div>
          <ArrowUpRight className="hero-agent-card__arrow" size={16} />
        </div>

        <div className="hero-console__footer">
          <div><span className="hero-check"><Check size={11} /></span> Legal RAG <span className="hero-footer-dot" /> Version-aware citations</div>
          <span className="hero-console__footer-note">Illustrative UI · not a deployed registry</span>
        </div>
      </Surface>

      <div className="hero-float-card hero-float-card--top"><div className="hero-float-icon"><Fingerprint size={15} /></div><div><span>ERC-8004</span><strong>Identity · reputation · validation</strong></div></div>
      <div className="hero-float-card hero-float-card--bottom"><div className="hero-float-icon hero-float-icon--blue"><Sparkles size={15} /></div><div><span>LEGAL ANSWER</span><strong>Source-linked by design</strong></div></div>
    </motion.div>
  );
}
