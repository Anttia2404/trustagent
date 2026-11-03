import { useState } from 'react';
import { ArrowUpRight, Check, CircleDashed, Fingerprint, ShieldCheck, X } from 'lucide-react';
import { agents, type LegalAgent } from '../lib/content';
import { Badge, SectionHeading } from './ui';
import { Reveal } from './Reveal';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

function AgentDialog({ agent, onClose }: { agent: LegalAgent; onClose: () => void }) {
  const Icon = agent.icon;
  const { dialogRef, closeButtonRef } = useDialogAccessibility(onClose);

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} className="agent-dialog" role="dialog" aria-modal="true" aria-labelledby="agent-dialog-title">
        <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        <div className={`agent-icon agent-icon--${agent.accent}`}><Icon size={20} /></div>
        <Badge tone={agent.status === 'MVP' ? 'green' : 'neutral'}>{agent.status === 'MVP' ? 'MVP · DEMO PROFILE' : 'ROADMAP'}</Badge>
        <h3 id="agent-dialog-title">{agent.name}</h3>
        <p>{agent.specialty}</p>
        <div className="dialog-details">
          <div><span>ERC-8004 identity</span><strong>Not connected · placeholder</strong></div>
          <div><span>Agent ID</span><strong>Not registered in this demo</strong></div>
          <div><span>x402 payment</span><strong>Conceptual integration · not live</strong></div>
          <div><span>Reputation / validation</span><strong>No production records</strong></div>
        </div>
        <div className="dialog-capabilities">
          <span className="mono-label">ILLUSTRATIVE CAPABILITIES</span>
          <div>{agent.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
        </div>
        <p className="dialog-disclaimer">This profile is a UI demonstration, not a deployed registry record or production API listing.</p>
      </div>
    </div>
  );
}

export function AgentMarketplace() {
  const [selected, setSelected] = useState<LegalAgent | null>(null);

  return (
    <section className="section section--agents" id="agents">
      <div className="shell">
        <Reveal>
          <div className="marketplace-heading">
            <SectionHeading
              index="02"
              eyebrow="AGENT DISCOVERY"
              title={<>Find the Right Legal Agent.<br /><span>Connect. Pay. Verify.</span></>}
              description="Specialized legal intelligence, packaged for people and machines. Explore the current product direction — clearly marked as demo or roadmap."
            />
            <div className="marketplace-count"><span>05</span><small>AGENT<br />CONCEPTS</small></div>
          </div>
        </Reveal>

        <div className="agent-grid">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isMvp = agent.status === 'MVP';
            return (
              <Reveal key={agent.name} delay={index * 0.045} className={`agent-card-wrap ${index < 2 ? 'agent-card-wrap--featured' : ''}`}>
                <article className={`agent-card ${isMvp ? 'agent-card--mvp' : ''}`}>
                  <div className="agent-card__top">
                    <div className={`agent-icon agent-icon--${agent.accent}`}><Icon size={20} /></div>
                    <Badge tone={isMvp ? 'green' : 'neutral'}>{isMvp ? 'ACTIVE · MVP' : 'COMING SOON'}</Badge>
                  </div>
                  <h3>{agent.name}</h3>
                  <p className="agent-card__specialty">{agent.specialty}</p>
                  <div className="agent-card__capabilities">
                    {agent.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
                  </div>
                  <div className="agent-card__meta">
                    <div className="agent-meta-row"><span><Fingerprint size={13} /> Agent ID · demo placeholder</span><strong>{isMvp ? 'Not registered' : 'Not assigned · roadmap'}</strong></div>
                    <div className="agent-meta-row"><span><CircleDashed size={13} /> ERC-8004 identity</span><strong>{isMvp ? 'Demo placeholder' : 'Roadmap'}</strong></div>
                    <div className="agent-meta-row"><span><Check size={13} /> x402 payment</span><strong>Concept · not live</strong></div>
                    <div className="agent-meta-row"><span><ShieldCheck size={13} /> Reputation / validation</span><strong>No production records</strong></div>
                  </div>
                  <button type="button" className="agent-card__action" onClick={() => setSelected(agent)}>
                    View Agent Details <ArrowUpRight size={15} />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="marketplace-footnote"><ShieldCheck size={15} /> All profiles, capabilities and status labels are illustrative. No real Agent IDs, registry records or production endpoints are represented.</div>
      </div>
      {selected && <AgentDialog agent={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
